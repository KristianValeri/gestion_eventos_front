export const createPage = (id) => {
  const main = document.querySelector('main')
  const div = document.createElement('div')
  main.innerHTML = ''
  main.appendChild(div)
  div.id = id
  return div
}


