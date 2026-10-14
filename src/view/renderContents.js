const renderFeeds = (feeds, divBlock) => {
  divBlock.innerHTML = ''
  const feedsEls = feeds.map((feed) => {
    const div = document.createElement('div')
    const h4 = document.createElement('h4')
    h4.className = 'text-base font-semibold'
    h4.textContent = feed.title
    const p = document.createElement('p')
    p.className = 'text-gray-500'
    p.textContent = feed.description

    div.append(h4, p)
    return div
  })
  divBlock.append(...feedsEls)
}
const renderPosts = (posts, divBlock) => {
  divBlock.innerHTML = ''
  const postsEls = posts.map(({ id, title, link }) => {
    const div = document.createElement('div')
    div.className = 'flex flex-col gap-2 min-[500px]:flex-row justify-between items-start my-3'
    const a = document.createElement('a')
    a.setAttribute('href', link)
    a.setAttribute('target', '_blank')
    a.className = 'text-blue-500 visited:text-gray-400'
    const p = document.createElement('p')
    p.className = 'text-base font-semibold'
    p.textContent = title
    const button = document.createElement('button')
    button.className = 'border border-blue-500 px-3 py-1 rounded-sm cursor-pointer text-blue-500 text-sm font-medium hover:bg-blue-500 hover:text-white transition delay-150 duration-300 ease-in-out'
    button.dataset.show = 'btn-show-post'
    button.id = id
    button.textContent = 'Просмотр'
    a.append(p)

    div.append(a, button)

    return div
  })
  const postsElsWithHr = postsEls.reduce((acc, post, i, posts) => {
    acc.push(post)
    if (i !== (posts.length - 1)) {
      const hr = document.createElement('hr')
      hr.className = 'w-full bg-gray-300 border-none h-[1px]'
      acc.push(hr)
    }
    return acc
  }, [])
  divBlock.append(...postsElsWithHr)
}

export default ({ feeds, posts }, elements) => {
  renderFeeds(feeds, elements.feeds)
  renderPosts(posts, elements.posts)

  elements.contents.style.display = 'flex'
}
