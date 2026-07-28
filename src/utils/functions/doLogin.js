import { api } from "../api/api";




export const doLogin = async (e) => {
  e.preventDefault()
  
  const form = event.target;
  const emailInput = form.email;
  const passwordInput = form.password;
   
    const body = {
      
      email: emailInput.value,
      password: passwordInput.value
    }
    
    
  
    const res = await api("/users/login", "POST", body)
    localStorage.setItem("token", res.token)
    localStorage.setItem("user", JSON.stringify(res.user))
    window.location.href = "/home"
  
  
    return res
  
}