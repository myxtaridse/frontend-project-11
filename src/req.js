import axios from 'axios'

const allOrigin = (href) => {
  const searchParams = new URLSearchParams({
    disableCache: 'true',
    url: href,
  })
  return `https://allorigins.hexlet.app/get?${searchParams.toString()}`
}

export default (href) => {
  const reqHref = allOrigin(href)
  return axios.get(reqHref)
}
