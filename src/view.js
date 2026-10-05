export default (state, submitBtn, message) => {
  const {
    process: { state: processState, error },
  } = state

  if (processState === 'processing') {
    submitBtn.disabled = true
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
