import './Login.css'
import { createPage } from '../../utils/functions/createPage'
import { AuthForm } from '../../components/AuthForm/AuthForm'

export const Login = () => {
  createPage('login').append(AuthForm('login'))
}
