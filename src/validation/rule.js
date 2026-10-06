export default class Rule {
  constructor(check, getMessage) {
    this.check = check;
    this.getMessage = getMessage;
  }
  validate(value) {
    return this.check(value) ? '' : this.getMessage();
  }
}