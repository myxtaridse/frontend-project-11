import Rule from './rule.js'
import { messages } from './messages.js'
import { hasValue, validRegexp } from './utils.js'

export default class StringSchema {
  constructor() {
    this.rules = []
  }
  add(rule) {
    this.rules.push(rule)
    return this
  }
  required() {
    return this.add(new Rule(hasValue, messages.required))
  }
  regexp(regexp) {
    return this.add(new Rule((value) => validRegexp(value, regexp), messages.regexp))
  }
  validate(value) {
    for (const rule of this.rules) {
      const error = rule.validate(value)
      if (error) {
        return error
      }
    }
  }
}
