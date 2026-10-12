import * as yup from 'yup'
import { keyFromSelector } from 'i18next'

yup.setLocale({
  mixed: {
    required: keyFromSelector(($) => $.searchForm.errors.required),
  },
  string: {
    matches: keyFromSelector(($) => $.searchForm.errors.matches),
  },
})

const schema = yup.object().shape({
  href: yup
    .string()
    .required()
    .matches(/^https?:\/\//),
})

export const validateForm = (formData) => schema.validate(formData)
