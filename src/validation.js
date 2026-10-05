import { hasValue, validateUrl } from './utils.js'

const rules = {
  require: hasValue,
  url: validateUrl,
}

// Ошибки:
// - RSS не существует
// - Ссылка должна быть валидным URL
// - Поле не должно быть пустым
// - Ошибка сети
// - Ресурс не содержит валидный RSS
export const errors = {
  require: 'Поле не должно быть пустым',
  url: 'Ссылка должна быть валидным URL',
}

const createValidator = (rules, errors) => {
  return function validate({ formData }) {
    const keyError = Object.keys(rules).find((key) => !rules[key](formData))
    return errors[keyError]
  }
}

export const validateForm = createValidator(rules, errors)
