const uniqueId = () => {
  return crypto.randomUUID()
}

const getText = (parent, selector) => {
  const element = parent.querySelector(selector)
  return element.textContent.trim()
}

export default (xml) => {
  const feed = {}

  const parser = new DOMParser()
  const doc = parser.parseFromString(xml, 'text/xml')

  feed.id = uniqueId()
  feed.title = getText(doc, 'title')
  feed.description = getText(doc, 'description')

  const posts = Array.from(doc.getElementsByTagName('item')).reduce((acc, item) => {
    const title = getText(item, 'title')
    const description = getText(item, 'description')
    const link = getText(item, 'link')
    const id = link

    return [...acc, { id, title, description, link, feedId: feed.id }]
  }, [])

  return { feed, posts }
}
