import StringSchema from './string.js'
import ObjectSchema from './object.js'

export default class Schema {
  string() {
    return new StringSchema()
  }
  object(shape) {
    return new ObjectSchema(shape)
  }
}
