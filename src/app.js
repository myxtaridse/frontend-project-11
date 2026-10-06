import updateUI from './view.js'
import { validateForm } from './validation/validateForm.js'
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
  const searchInput = document.querySelector('input#searchInput')
  const submitBtn = document.getElementById('submitBtn')
  const message = document.getElementById('message')

  subscribe(state.process, () => updateUI(state, submitBtn, message))

  searchInput.addEventListener('input', (event) => {
    state.formData.href = event.target.value
  })

  form.addEventListener('submit', (event) => {
    console.log('555')
    event.preventDefault()

    const error = validateForm(state)

    if (error) {
      state.process.state = 'failed'
      state.process.error = error
      return
    }

    state.process.state = 'processing'

    setTimeout(() => {
      state.process.state = 'success'
    }, 2000)
  })

  updateUI(state, submitBtn, message)
}
