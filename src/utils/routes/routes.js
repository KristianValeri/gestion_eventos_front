import { Home } from '../../pages/Home/Home';
import { CreateEvent } from '../../pages/CreateEvent/CreateEvent';
import { Login } from '../../pages/Login/Login';
import { Event } from '../../pages/Event/Event';

export const routes = [
  {
    path: '/',
    text: 'Home',
    page: Home
  },
  {
    path: '/events',
    text: 'Crea tu evento',
    page: CreateEvent
  },
  {
    path: '/login',
    text: 'Login',
    page: Login
  },
  {
  path:"/logout",
  text:"Logout",
  page: () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/";
},

},
  {
    path: '/event',
    text: 'Event',
    page: Event,
    hidden: true
  }
]