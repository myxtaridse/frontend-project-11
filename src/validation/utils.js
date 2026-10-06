export const hasValue = value => !!(value.trim());
export const validRegexp = (value, regexp) => regexp.test(value)