import { proxy } from 'valtio/vanilla'
import i18next, { keyFromSelector } from 'i18next'
import { validateForm } from './validateForm.js'
import resources from './locales/index.js'
import view from './view/index.js'
import req from './req.js'
import parserXML from './parserXML.js'
import axios from 'axios'
import recursiveReq from './recursiveReq.js'

export default () => {
  const defaultLng = 'ru'
  const i18n = i18next.createInstance()
  const state = proxy({
    searchForm: {
      fields: {
        href: '',
      },
      process: {
        state: 'filling', // processing | failed | success
        error: null,
        isValid: true,
      },
    },
    contents: {
      feeds: [],
      posts: [],
    },
    uiState: {
      activePost: null,
      visitedPosts: [],
    },
  })

  const elements = {
    form: document.querySelector('[role="search"]'),
    formEls: {
      message: document.getElementById('search-message'),
      submitBtn: document.getElementById('submitBtn'),
    },
    contents: document.getElementById('contents'),
    feeds: document.getElementById('feeds'),
    posts: document.getElementById('posts'),
    modal: document.querySelector('dialog'),
    modalEls: {
      title: document.getElementById('post-title'),
      description: document.getElementById('post-description'),
      more: document.getElementById('post-more-btn'),
      closeEls: document.querySelectorAll('[data-action="close-btn"]'),
    },
  }

  elements.modalEls.more.addEventListener('click', () => {
    const post = state.contents.posts.find(({ id }) => id === state.uiState.activePost)
    if (post) {
      window.open(post.link, '_blank')
    }
  })

  elements.modalEls.closeEls.forEach((closeEl) => {
    closeEl.addEventListener('click', () => {
      state.uiState.activePost = null
    })
  })

  elements.posts.addEventListener('click', (event) => {
    const btnPost = event.target.closest("[data-show='btn-show-post']")
    state.uiState.activePost = btnPost.id
    state.uiState.visitedPosts = [...state.uiState.visitedPosts, btnPost.id]
  })

  elements.form.addEventListener('submit', (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const fields = Object.fromEntries(formData)

    validateForm(fields)
      .then(({ href }) => {
        if (state.contents.feeds.some((feed) => feed.href === href)) {
          throw Object.assign(new Error(), { code: 'RSS_STILL_EXISTS' })
        }
        state.searchForm.process.isValid = true
        state.searchForm.process.state = 'processing'

        return req(href).then(({ data }) => {
          const responseData = typeof data === 'string' ? JSON.parse(data) : data
          const { feed, posts } = parserXML(responseData.contents)
          const newFeed = { ...feed, href }
          state.contents.feeds = [newFeed, ...state.contents.feeds]
          state.contents.posts = [...posts, ...state.contents.posts]
          state.searchForm.process.state = 'success'

          state.searchForm.fields.href = href
          setTimeout(() => recursiveReq(state), 5000)
        })
      })
      .catch((error) => {
        console.log(error, 'Проверяем, где именно ломается parserXML при ошибочных тестах')
        state.searchForm.process.state = 'failed'
        if (error.name === 'ValidationError') {
          state.searchForm.process.isValid = false
          state.searchForm.process.error = error.message
        } else if (axios.isAxiosError(error)) {
          if (error.code === 'ERR_NETWORK') {
            state.searchForm.process.error = keyFromSelector(($) => $.searchForm.errors.network)
          }
        } else if (error.code === 'RSS_STILL_EXISTS') {
          state.searchForm.process.error = keyFromSelector(
            ($) => $.searchForm.errors.rssStillExists,
          )
        } else {
          state.searchForm.process.error = keyFromSelector(($) => $.searchForm.errors.notFound)
        }
      })
  })
  i18n
    .init({
      lng: defaultLng,
      debug: false,
      resources,
    })
    .then(() => view(state, i18n, elements))
}
