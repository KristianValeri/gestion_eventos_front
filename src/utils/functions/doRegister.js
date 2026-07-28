import { api } from "../api/api";




export const doRegister = async (e) => {
  e.preventDefault()
  
  const [usernameInput, emailInput, passwordInput] = e.target;

  const body = {
    username: usernameInput.value,
    email: emailInput.value,
    password: passwordInput.value
  }
  const res = await api("/users/register", "POST", body)
  

  
}

