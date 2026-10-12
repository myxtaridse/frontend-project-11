import axios from "axios"

const allOrigin = href => `https://allorigins.hexlet.app/get?disableCache=true&url=${href}`

export default async (href) => {
  const reqHref = allOrigin(href)
  const res = await axios.get(reqHref)
  return res
}