import { subscribe } from 'valtio/vanilla'
import renderContents from './renderContents.js'
import renderProcess from './renderProcess.js'
import renderTextInterface from './renderTextInterface.js'

export default (state, i18n, elements) => {
  const { searchForm: { process }, contents, uiState } = state

  renderTextInterface(i18n) 

  subscribe(state.contents, () => renderContents(contents, elements))

  subscribe(state.searchForm.process, () => renderProcess(process, i18n, elements))

  subscribe(state.uiState, () => {
    if (uiState.activePost) {
      const post = contents.posts.find(({ id }) => id === uiState.activePost)
      const { title, description } = elements.modalEls
      title.textContent = post.title
      description.textContent = post.description

      elements.modal.showModal()
    } else {
      elements.modal.close()
    }
  })
}
