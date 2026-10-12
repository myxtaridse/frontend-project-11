const uniqueId = () => {
  return crypto.randomUUID()
}

export default (xml) => {
  const feed = {}

  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, "application/xml");
  feed.id = uniqueId()
  feed.title = doc.querySelector('title').textContent
  feed.description = doc.querySelector('description').textContent
  
  const items = new Array(...doc.getElementsByTagName('item')).reduce((acc, item) => {
    const id = uniqueId()
    const title = item.getElementsByTagName('title')[0].textContent
    const description = item.getElementsByTagName('description')[0].textContent
    const link = item.getElementsByTagName('link')[0].textContent
    // console.log(title, 'title')
    return [...acc, { id, title, description, link }]
  }, [])

  feed.items = items
  return feed
}