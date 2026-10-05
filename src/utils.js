export const hasValue = ({ href }) => !!href.trim()
export const validateUrl = ({ href }) => href.startWith(/https?:\/\//)
