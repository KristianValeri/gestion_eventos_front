import './AuthForm.css'
import { el } from '../../utils/dom/el'
import { api } from '../../utils/api/api'
import { saveSession } from '../../utils/session/session'
import { navigate } from '../../utils/functions/navigate'
import { Form } from '../Form/Form'
import { Button } from '../Button/Button'

const EMAIL = { labelText: 'Email', name: 'email', type: 'email', autocomplete: 'email' }

const MODES = {
  login: {
    title: 'Inicia sesión',
    endpoint: '/users/login',
    submitText: 'Entrar',
    loadingText: 'Entrando…',
    toggleText: '¿No tienes cuenta? Regístrate',
    other: 'register',
    fields: [EMAIL, { labelText: 'Contraseña', name: 'password', type: 'password', autocomplete: 'current-password' }]
  },
  register: {
    title: 'Crea tu cuenta',
    endpoint: '/users/register',
    submitText: 'Registrarme',
    loadingText: 'Creando cuenta…',
    toggleText: '¿Ya tienes cuenta? Inicia sesión',
    other: 'login',
    fields: [
      { labelText: 'Nombre de usuario', name: 'username', autocomplete: 'username' },
      EMAIL,
      { labelText: 'Contraseña (mín. 6 caracteres)', name: 'password', type: 'password', minLength: 6, autocomplete: 'new-password' }
    ]
  }
}

// Login y registro en un solo componente. Ambos endpoints devuelven { token, user },
// así que tras registrarse el usuario queda ya logueado.
export const AuthForm = (initialMode = 'login') => {
  const card = el('div', { className: 'auth-card' })

  const render = (mode) => {
    const config = MODES[mode]
    card.replaceChildren(
      el('h1', {}, config.title),
      Form({
        fields: config.fields,
        submitText: config.submitText,
        loadingText: config.loadingText,
        onSubmit: async (form) => {
          const body = Object.fromEntries(new FormData(form))
          saveSession(await api(config.endpoint, { method: 'POST', body }))
          navigate('/')
        }
      }),
      Button({ text: config.toggleText, className: 'auth-toggle', onClick: () => render(config.other) })
    )
  }

  render(initialMode)
  return card
}
