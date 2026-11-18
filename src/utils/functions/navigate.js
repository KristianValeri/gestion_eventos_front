import { routes } from '../routes/routes'
import { Header } from '../../components/Header/Header'
import { isLogged } from '../session/session'

const findRoute = (pathname) => routes.find((route) => route.path === pathname && route.page)

export const renderRoute = () => {
  const route = findRoute(window.location.pathname) ?? findRoute('/')

  if (route.private && !isLogged()) return navigate('/login', { replace: true })
  if (route.guestOnly && isLogged()) return navigate('/', { replace: true })

  Header()
  route.page()
}

export const navigate = (path, { replace = false } = {}) => {
  window.history[replace ? 'replaceState' : 'pushState']({}, '', path)
  renderRoute()
}

window.addEventListener('popstate', renderRoute)
