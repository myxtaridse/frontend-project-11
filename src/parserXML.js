const uniqueId = () => {
  return crypto.randomUUID()
}

export default (xml) => {
  const feed = {}

  const parser = new DOMParser()
  const doc = parser.parseFromString(xml, "application/xml")

  feed.id = uniqueId()
  feed.title = doc.querySelector('title').textContent
  feed.description = doc.querySelector('description').textContent
  
  const posts = new Array(...doc.getElementsByTagName('item')).reduce((acc, item) => {
    const id = item.getElementsByTagName('guid')[0].textContent ?? item.getElementsByTagName('id')[0].textContent
    const title = item.getElementsByTagName('title')[0].textContent
    const description = item.getElementsByTagName('description')[0].textContent
    const link = item.getElementsByTagName('link')[0].textContent

    return [...acc, { id, title, description, link, feedId: feed.id }]
  }, [])

  return { feed, posts }
}