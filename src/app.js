import { proxy } from 'valtio/vanilla'
import i18next from 'i18next'
import { validateForm } from './validateForm.js'
import resources from './locales/index.js'
import view from './view.js'
import renderForm from './renderForm.js'

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
      process: {
        state: 'filling', // processing | failed | success
        errors: {},
        isValid: 'invalid', // valid
      },
    },
  })

  const form = document.getElementById('searchForm')
  const searchInput = form.querySelector('input#searchInput')

  renderForm(i18n)

  searchInput.addEventListener('input', (event) => {
    state.searchForm.fields.href = event.target.value
  })
  form.addEventListener('submit', (event) => {
    event.preventDefault()

    validateForm(state.searchForm.fields)
      .then((data) => {
        state.searchForm.process.isValid = 'valid'
        state.searchForm.process.state = 'processing'

        setTimeout(() => {
          state.searchForm.process.state = 'success'
        }, 2000)
      })
      .catch((error) => {
        state.searchForm.process.state = 'failed'
        if (error.name === 'ValidationError') {
          state.searchForm.process.isValid = 'invalid'
          state.searchForm.process.errors['href'] = error.message
        }
        console.log(state.searchForm.process)
      })
  })
  view(state, i18n)
}
