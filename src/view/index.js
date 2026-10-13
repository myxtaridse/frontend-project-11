import { subscribe } from 'valtio/vanilla'
import renderContents from './renderContents.js'
import renderProcess from './renderProcess.js'
import renderTextInterface from './renderTextInterface.js'

export default (state, i18n, elements) => {
  const { process, contents } = state.searchForm

  renderTextInterface(i18n) 

  subscribe(state.searchForm.contents, () => renderContents(contents, elements))

  subscribe(state.searchForm.process, () => renderProcess(process, i18n, elements))
}
