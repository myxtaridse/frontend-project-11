export default (uiState, posts, elements) => {
  if (uiState.activePost) {
    const post = posts.find(({ id }) => id === uiState.activePost)
    const { title, description } = elements.modalEls
    title.textContent = post.title
    description.textContent = post.description

    elements.modal.showModal()
  } else {
    elements.modal.close()
  }
}
