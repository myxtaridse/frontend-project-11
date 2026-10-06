import Schema from './schema.js';

export const validateForm = ({ formData }) => {
  const schema = new Schema();
  const formSchema = schema.object({
    href: schema.string().required().regexp(/^https?:\/\//),
  });
  const messagesV = formSchema.validate(formData);
  return messagesV.href;
}