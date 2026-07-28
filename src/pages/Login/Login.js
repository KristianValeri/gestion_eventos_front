import './Login.css'
import { createPage } from '../../utils/functions/createPage'
import { Button } from '../../components/Button/Button'
import { LoginForm } from '../../components/LoginForm/LoginForm'
import { RegisterForm } from '../../components/RegisterForm/RegisterForm'
import { doLogin } from '../../utils/functions/doLogin'
import { doRegister } from '../../utils/functions/doRegister'

let showLogin = true
export const Login = () => {
  const div = createPage('login')
  const form = document.createElement('form')
  form.className = 'login-card'

  const toggleButton = Button({
    text: 'Regístrate si no tienes cuenta',
    fnc: () => {
      showLogin = !showLogin
      showLogin ? LoginForm(form) : RegisterForm(form)
      toggleButton.textContent = showLogin
        ? 'Regístrate si no tienes cuenta'
        : 'Inicia sesión si ya tienes cuenta'

      if (showLogin) {
        form.removeEventListener('submit', doRegister)
      } else {
        form.removeEventListener('submit', doLogin)
      }
      form.addEventListener('submit', showLogin ? doLogin : doRegister)
    },
    className: 'button-toggle btn btn-secondary'
  })

  form.appendChild(toggleButton)
  form.addEventListener('submit', doLogin)
  LoginForm(form)
  div.appendChild(form)
}
