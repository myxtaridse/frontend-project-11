import { snapshot } from 'valtio/vanilla'

export default (state, formEl) => {
  const obj = snapshot(state)
  const { state: processState, error } = obj.process

  const submitBtn = document.getElementById('submitBtn')
  const message = document.getElementById('message')

  if (processState === 'processing') {
    formEl.reset();
    submitBtn.disabled = true
    message.textContent = ''
  } else if (processState === 'failed') {
    submitBtn.disabled = false
    message.textContent = error
  } else if (processState === 'success') {
    submitBtn.disabled = true
    message.textContent = 'RSS успешно загружен'
  } else {
    submitBtn.disabled = false
    message.textContent = error
  }
}
