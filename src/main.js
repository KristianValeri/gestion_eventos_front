import './style.css'
import { Main } from './components/Main/Main'
import { Header } from './components/Header/Header'
import { renderRoute } from './utils/functions/navigate'
import { SESSION_CHANGE } from './utils/session/session'

Main()
renderRoute()
// Login, registro, logout o token caducado: el menú se actualiza solo
window.addEventListener(SESSION_CHANGE, Header)
