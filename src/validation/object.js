export default class ObjectSchema {
  constructor(shape) {
    this.shape = shape;
  }
  validate(obj) {
    const errors = {};
    for (const [field, schema] of Object.entries(this.shape)) {
      const error = schema.validate(obj[field]);
      if (error) {
        errors[field] = error;
      }
    }
    return errors;
  }
}