const renderFeeds = (feeds, divBlock) => {
  divBlock.innerHTML = ''
  const feedsEls = feeds.map((feed) => {
    const li = document.createElement('li')
    const div = document.createElement('div')
    const h4 = document.createElement('h4')
    h4.className = 'text-base font-semibold'
    h4.textContent = feed.title
    const p = document.createElement('p')
    p.className = 'text-gray-500'
    p.textContent = feed.description

    div.append(h4, p)
    li.append(div)
    return li
  })
  divBlock.append(...feedsEls)
}
const renderPosts = (posts, divBlock, visitedPosts) => {
  divBlock.innerHTML = ''
  const postsEls = posts.map(({ id, title, link }) => {
    const li = document.createElement('li')
    const div = document.createElement('div')
    div.className = 'flex flex-col gap-2 min-[500px]:flex-row justify-between items-start min-[500px]:items-center my-3'
    div.dataset.element = 'post'
    const a = document.createElement('a')
    a.setAttribute('href', link)
    a.setAttribute('target', '_blank')
    a.dataset.seen = visitedPosts.includes(id)
    a.className = 'text-blue-500 data-[seen=true]:text-gray-400'
    const p = document.createElement('p')
    p.className = 'text-base font-semibold'
    p.textContent = title
    const button = document.createElement('button')
    button.className =
      'border border-blue-500 px-3 py-1 rounded-sm cursor-pointer text-blue-500 text-sm font-medium hover:bg-blue-500 hover:text-white transition delay-150 duration-300 ease-in-out'
    button.dataset.show = 'btn-show-post'
    button.id = id
    button.textContent = 'Просмотр'
    a.append(p)

    div.append(a, button)
    li.append(div)

    return li
  })
  const postsElsWithHr = postsEls.reduce((acc, post, i, posts) => {
    acc.push(post)
    if (i !== posts.length - 1) {
      const hr = document.createElement('hr')
      hr.className = 'w-full bg-gray-300 border-none h-[1px]'
      acc.push(hr)
    }
    return acc
  }, [])
  divBlock.append(...postsElsWithHr)
}

export default ({ feeds, posts }, elements, visitedPosts) => {
  renderFeeds(feeds, elements.feeds)
  renderPosts(posts, elements.posts, visitedPosts)

  elements.contents.style.display = 'flex'
}
