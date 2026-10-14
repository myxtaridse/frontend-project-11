export default (i18n) => {
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    el.textContent = i18n.t(($) => $[el.dataset.i18n])
  })
  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    el.placeholder = i18n.t(($) => $[el.dataset.i18nPlaceholder])
  })
}
