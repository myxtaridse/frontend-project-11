import * as yup from 'yup';

yup.setLocale({
  mixed: {
    required: 'Поле не должно быть пустым',
  },
  string: {
    matches: 'Ссылка должна быть валидным URL'
  }
});

const schema = yup.object().shape({
  href: yup.string().required().matches(/^https?:\/\//),
});

export const validateForm = ({ formData }) => {
  return schema.validate(formData);
}