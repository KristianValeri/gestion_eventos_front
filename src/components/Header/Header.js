import './Header.css'
import menuIcon from '../../assets/menu.png'
import { el } from '../../utils/dom/el'
import { routes } from '../../utils/routes/routes'
import { isLogged } from '../../utils/session/session'
import { Link } from '../Link/Link'

const visible = (route) => route.text && !(route.private && !isLogged()) && !(route.guestOnly && isLogged())

// Se puede llamar varias veces: sustituye el header anterior (p. ej. tras login/logout)
export const Header = () => {
  const nav = el('nav')
  const close = () => nav.classList.remove('open')

  nav.append(
    el(
      'ul',
      {},
      routes.filter(visible).map((route) =>
        el(
          'li',
          {},
          Link({
            text: route.text,
            to: route.path,
            className: window.location.pathname === route.path ? 'active' : undefined,
            onClick: route.action
          })
        )
      )
    )
  )
  // Link navega por defecto; cerramos el menú móvil tras cualquier clic
  nav.addEventListener('click', (e) => e.target.closest('a') && close())

  const header = el(
    'header',
    {},
    el('img', { src: menuIcon, alt: 'Abrir menú', className: 'menu', onClick: () => nav.classList.toggle('open') }),
    nav
  )

  document.querySelector('header')?.remove()
  document.body.prepend(header)
}
