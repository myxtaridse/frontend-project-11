export const hasValue = ({ href }) => !!(href.trim());
export const validateUrl = ({ href }) => (/^https:\/\//).test(href);