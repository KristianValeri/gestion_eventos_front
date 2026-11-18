import { Home } from '../../pages/Home/Home'
import { CreateEvent } from '../../pages/CreateEvent/CreateEvent'
import { Login } from '../../pages/Login/Login'
import { Event } from '../../pages/Event/Event'
import { clearSession } from '../session/session'
import { navigate } from '../functions/navigate'

// private: solo con sesión · guestOnly: solo sin sesión · text: aparece en el menú
export const routes = [
  { path: '/', text: 'Eventos', page: Home },
  { path: '/event', page: Event },
  { path: '/events/new', text: 'Crea tu evento', page: CreateEvent, private: true },
  { path: '/login', text: 'Login', page: Login, guestOnly: true },
  {
    path: '/logout',
    text: 'Logout',
    private: true,
    action: () => {
      clearSession()
      navigate('/')
    }
  }
]
