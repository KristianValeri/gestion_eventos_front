import { el } from '../dom/el'

export const createPage = (id) => {
  const page = el('section', { id })
  document.querySelector('main').replaceChildren(page)
  return page
}
