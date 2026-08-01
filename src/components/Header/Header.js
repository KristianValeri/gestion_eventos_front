import { routes } from '../../utils/routes/routes'
import { navigate } from '../../utils/functions/navigate'
import './Header.css'
import menuIcon from '../../assets/menu.png'

export const Header = () => {
  const header = document.createElement('header')
  const nav = document.createElement('nav')
  const ul = document.createElement('ul')
  const img = document.createElement('img')
  img.src = menuIcon
  img.alt = 'menu'
  img.classList.add('menu')
  header.appendChild(img)

  for (const route of routes) {
    if (route.hidden) {
      continue
    }
    if (route.text === 'Logout' && !localStorage.getItem('token')) {
      continue
    }
    if (route.text === 'Login' && localStorage.getItem('token')) {
      continue
    }
    if (route.text === 'Crea tu evento' && !localStorage.getItem('token')) {
      continue
    }
    const li = document.createElement('li')
    ul.appendChild(li)
    const a = document.createElement('a')

    a.addEventListener('click', (e) => {
      navigate(e, route)
      // close mobile menu after navigation
      nav.classList.remove('open')
    })

    a.href = route.path
    a.textContent = route.text
    li.appendChild(a)
  }
  nav.appendChild(ul)
  header.appendChild(nav)

  // Toggle mobile menu when clicking the icon
  img.addEventListener('click', () => {
    nav.classList.toggle('open')
  })
  document.body.appendChild(header)
}
