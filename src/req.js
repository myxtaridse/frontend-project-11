import axios from "axios"

const allOrigin = href => `https://allorigins.hexlet.app/get?disableCache=true&url=${href}`

export default (href) => {
  const reqHref = allOrigin(href)
  return axios.get(reqHref)
}