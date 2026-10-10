export default (i18n) => {
  const elements = document.querySelectorAll('[data-i18n]')
  elements.forEach((el) => {
    el.textContent = i18n.t($ => $.searchForm[el.dataset.i18n])
  })
}