import updateUI from './view.js'
import { validateForm } from './validation/validateForm.js'

export default () => {
  const state = {
    formData: {
      href: '',
    },
    process: {
      state: 'filling', // 'processing' | 'failed' | 'success'
      error: '',
      validationState: 'invalid', // 'valid'
    },
  }

  const form = document.getElementById('searchForm')
  const searchInput = document.querySelector('input#searchInput')
  const submitBtn = document.getElementById('submitBtn')
  const message = document.getElementById('message')

  searchInput.addEventListener('input', (event) => {
    state.formData.href = event.target.value
  })

  form.addEventListener('submit', (event) => {
    event.preventDefault()

    const error = validateForm(state)

    if (error) {
      state.process.state = 'failed'
      state.process.error = error
      updateUI(state, submitBtn, message)
      return
    }

    state.process.state = 'processing'

    setTimeout(() => {
      state.process.state = 'success'
    }, 2000)
  })

  updateUI(state, submitBtn, message)
}
