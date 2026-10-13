import { proxy } from 'valtio/vanilla'
import i18next, { keyFromSelector } from 'i18next'
import { validateForm } from './validateForm.js'
import resources from './locales/index.js'
import view from './view/index.js'
import req from './req.js'
import parserXML from './parserXML.js'
import axios from 'axios'

export default async () => {
  const defaultLng = 'ru'
  const i18n = i18next.createInstance()
  await i18n.init({
    lng: defaultLng,
    debug: false,
    resources,
  })
  const state = proxy({
    searchForm: {
      fields: {
        href: '',
      },
      contents: {
        feeds: [],
        posts: []
      },
      process: {
        state: 'filling', // processing | failed | success
        errors: {},
        isValid: 'invalid', // valid
      },
    },
  })

  const elements = {
    form: document.getElementById('searchForm'),
    formEls: {
      message: document.getElementById('message'),
    },
    contents: document.getElementById('contents'),
    feeds: document.getElementById('feeds'),
    posts: document.getElementById('posts')
  }

  elements.form.addEventListener('submit', (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const href = formData.get('href')
    state.searchForm.fields.href = href

    validateForm(state.searchForm.fields)
      .then(({ href }) => {
        if (state.searchForm.contents.feeds.some(feed => feed.href === href)) {
          throw Object.assign(new Error(), { code: 'RSS_STILL_EXISTS' })
        }
        state.searchForm.process.isValid = 'valid'
        state.searchForm.process.state = 'processing'

        return req(href)
          .then(({ data }) => {
            const { feed, posts } = parserXML(data.contents)
            const newFeed = { ...feed, href }
            state.searchForm.contents.feeds = [...state.searchForm.contents.feeds, newFeed]
            state.searchForm.contents.posts = posts
            state.searchForm.process.state = 'success'
          })
      })
      .catch((error) => {
        state.searchForm.process.state = 'failed'
        if (error.name === 'ValidationError') {
          state.searchForm.process.isValid = 'invalid'
          state.searchForm.process.errors.invalid = error.message
        } else if (axios.isAxiosError(error)) {
          if (error.code === 'ERR_NETWORK') {
            state.searchForm.process.errors.network = keyFromSelector(($) => $.searchForm.errors.network)
          }
        } else if (error.code === 'RSS_STILL_EXISTS') {
          state.searchForm.process.errors.rssStillExists = keyFromSelector(($) => $.searchForm.errors.rssStillExists)
        } else {
          state.searchForm.process.errors.notFound = keyFromSelector(($) => $.searchForm.errors.notFound)
        }
      })
  })
  view(state, i18n, elements)
}
