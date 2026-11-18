import './Message.css'
import { el } from '../../utils/dom/el'

// Zona de aviso reutilizable: message.show(texto, 'error' | 'success') / message.clear()
export const Message = () => {
  const message = el('p', { className: 'message', role: 'alert', hidden: true })
  message.show = (text, type = 'error') => {
    message.textContent = text
    message.className = `message message-${type}`
    message.hidden = false
  }
  message.clear = () => {
    message.textContent = ''
    message.hidden = true
  }
  return message
}
