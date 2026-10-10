import { subscribe } from 'valtio/vanilla'

export default (state, i18n) => {
  const { process } = state.searchForm

  const formEl = document.getElementById('searchForm')
  const submitBtn = document.getElementById('submitBtn')
  const message = document.getElementById('message')

  subscribe(state.searchForm.process, () => {
    message.classList.toggle('text-red-400', process.isValid === 'invalid')
    message.classList.toggle('text-green-400', process.isValid === 'valid')

    if (process.state === 'processing') {
      formEl.reset();
      submitBtn.disabled = true
      message.textContent = ''
    } else if (process.state === 'failed') {
      submitBtn.disabled = false
      Object.values(process.errors).forEach(error => message.textContent = i18n.t(error))
    } else if (process.state === 'success') {
      submitBtn.disabled = true
      message.textContent = 'RSS успешно загружен'
    } else {
      submitBtn.disabled = false
      message.textContent = ''
    }
  })
}
