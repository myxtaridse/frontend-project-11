import parserXML from './parserXML'
import req from './req'

const recursiveReq = (state) => {
  state.contents.feeds.forEach(({ href }) => {
    req(href).then(({ data }) => {
      const { posts } = parserXML(data.contents)
      const idsStatePosts = state.contents.posts.map(({ id }) => id)
      const idsSet = new Set(idsStatePosts)
      const filteredStatePosts = posts.filter(({ id }) => !idsSet.has(id))
      state.contents.posts = [...filteredStatePosts, ...state.contents.posts]

      setTimeout(() => recursiveReq(state), 5000)
    })
  })
}
export default recursiveReq
