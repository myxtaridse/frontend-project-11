import * as yup from 'yup'
import { keyFromSelector } from 'i18next'

yup.setLocale({
  mixed: {
    required: keyFromSelector(($) => $.searchForm.errors.required),
  },
  string: {
    url: keyFromSelector(($) => $.searchForm.errors.url),
  },
})

const schema = yup.object().shape({
  href: yup
    .string()
    .trim()
    .required()
    .url(),
})

export const validateForm = (formData) => schema.validate(formData)
