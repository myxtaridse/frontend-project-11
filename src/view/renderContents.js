export default ({ feed, posts }, elements) => {
  const h4 = document.createElement('h4')
  h4.className = 'text-base font-semibold'
  h4.textContent = feed.title
  const p = document.createElement('p')
  p.className = 'text-gray-500 text-sm font-normal'
  p.textContent = feed.description

  elements.feed.append(h4, p)

  posts.forEach(({ title, link }, i, posts) => {
    const div = document.createElement('div')
    div.className = 'flex flex-col gap-2 min-[500px]:flex-row justify-between items-start my-3'
    const a = document.createElement('a')
    a.setAttribute('href', link)
    a.setAttribute('target', '_blank')
    const p = document.createElement('p')
    p.className = 'text-base text-gray-500 font-semibold'
    p.textContent = title
    const button = document.createElement('button')
    button.className = 'border border-blue-500 px-3 py-1 rounded-sm cursor-pointer text-blue-500 text-sm font-medium hover:bg-blue-500 hover:text-white transition delay-150 duration-300 ease-in-out'
    button.textContent = 'Просмотр'
    a.append(p)
    div.append(a, button)

    elements.posts.append(div)

    if (i !== posts.length - 1) {
      const hr = document.createElement('hr')
      hr.className = 'w-full bg-gray-300 border-none h-[1px]'
      elements.posts.append(hr)
    }
  })
  elements.contents.style.display = 'flex'
}