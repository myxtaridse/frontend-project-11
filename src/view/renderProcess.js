export default (process, i18n, elements) => {
  const { form, formEls } = elements
  formEls.message.classList.toggle('text-red-400', process.state === 'failed')
  formEls.message.classList.toggle('text-green-400', process.state === 'success')

  if (process.state === 'processing') {
    formEls.message.textContent = ''
    formEls.submitBtn.disabled = true
  } else if (process.state === 'failed') {
    form.reset()
    formEls.message.textContent = i18n.t(process.error)
    formEls.submitBtn.disabled = false
  } else if (process.state === 'success') {
    form.reset()
    formEls.message.textContent = i18n.t($ => $.searchForm.messageSuccess)
    formEls.submitBtn.disabled = false
  } else {
    formEls.message.textContent = ''
    formEls.submitBtn.disabled = false
  }
}