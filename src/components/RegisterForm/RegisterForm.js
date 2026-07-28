import './RegisterForm.css'
import { FieldForm } from '../FieldForm/FieldForm'
import { Button } from '../Button/Button'

export const RegisterForm = (form) => {
  // Preserve existing button and container class
  form.className = 'login-card'
  
  // Get toggle button before clearing
  const toggleButton = form.querySelector('.button-toggle')
  
  // Clear only form content, not children
  const existingContent = form.querySelector('.form-content')
  if (existingContent) {
    existingContent.remove()
  }

  
  const formContent = document.createElement('div')
  formContent.className = 'form-content'
  formContent.innerHTML = `
    ${FieldForm({ labelText: 'Username', type: 'text', required: true, name: 'username' })}
    ${FieldForm({ labelText: 'Email', type: 'email', required: true, name: 'email' })}
    ${FieldForm({ labelText: 'Password', type: 'password', required: true, name: 'password' })}
  `

  formContent.append(Button({ text: 'Registrarse', fnc: () => {} }))
  
  
  if (toggleButton && !form.contains(toggleButton)) {
    form.appendChild(toggleButton)
  }
  form.appendChild(formContent)
}