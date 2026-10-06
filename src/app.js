import updateUI from './view.js'
import { validateForm } from './validation/yupValidation.js'
import { proxy, subscribe } from 'valtio/vanilla'

export default () => {
  const state = proxy({
    formData: {
      href: '',
    },
    process: {
      state: 'filling', // 'processing' | 'failed' | 'success'
      error: '',
      validationState: 'invalid', // 'valid'
    },
  })

  const form = document.getElementById('searchForm')
  const searchInput = form.querySelector('input#searchInput')

  subscribe(state.process, () => updateUI(state, form))

  searchInput.addEventListener('input', (event) => {
    state.formData.href = event.target.value
  })

  form.addEventListener('submit', (event) => {
    event.preventDefault()

    validateForm(state)
      .then(({href}) => {
        state.process.state = 'processing'

        setTimeout(() => {
          state.process.state = 'success'
        }, 2000)
      })
      .catch((error) => {
        state.process.state = 'failed'
        state.process.error = error.message
      })
  })

  updateUI(state, form)
}
