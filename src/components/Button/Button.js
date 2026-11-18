import './Button.css'
import { el } from '../../utils/dom/el'

export const Button = ({ text, onClick, type = 'button', className = '' }) =>
  el('button', { type, className: `main-button ${className}`.trim(), onClick }, text)
