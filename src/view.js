import { snapshot } from "valtio/vanilla"

export default (state, submitBtn, message) => {
  const obj = snapshot(state)
  const { state: processState, error } = obj.process

  console.log(error)

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
