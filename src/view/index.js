import { subscribe } from 'valtio/vanilla'
import renderContents from './renderContents.js'
import renderProcess from './renderProcess.js'
import renderTextInterface from './renderTextInterface.js'
import renderModal from './renderModal.js'

export default (state, i18n, elements) => {
  const {
    searchForm: { process },
    contents,
    uiState,
  } = state

  renderTextInterface(i18n)

  subscribe(state.contents, () => renderContents(contents, elements, uiState.visitedPosts))
  subscribe(state.uiState, () => {
    renderContents(contents, elements, uiState.visitedPosts)
    renderModal(uiState, contents.posts, elements)
  })

  subscribe(state.searchForm.process, () => renderProcess(process, i18n, elements))
}
