export default (process, i18n, elements) => {
  const { form, formEls } = elements
  formEls.message.classList.toggle('text-red-400', process.isValid === 'invalid')
  formEls.message.classList.toggle('text-green-400', process.isValid === 'valid')

  if (process.state === 'processing') {
    form.reset()
    // submitBtn.disabled = true
    formEls.message.textContent = ''
  } else if (process.state === 'failed') {
    formEls.submitBtn.disabled = false
    Object.values(process.errors).forEach((error) => (message.textContent = i18n.t(error)))
  } else if (process.state === 'success') {
    formEls.submitBtn.disabled = true
    formEls.message.textContent = 'RSS успешно загружен'
  } else {
    formEls.submitBtn.disabled = false
    formEls.message.textContent = ''
  }
}