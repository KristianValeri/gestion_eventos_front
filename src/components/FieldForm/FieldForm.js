import './FieldForm.css'
import { el } from '../../utils/dom/el'

export const FieldForm = ({ labelText, name, type = 'text', required = true, ...attrs }) => {
  const id = `field-${name}`
  const input =
    type === 'textarea'
      ? el('textarea', { id, name, required, ...attrs })
      : el('input', { id, name, type, required, ...attrs })

  return el('div', { className: 'field-form' }, el('label', { htmlFor: id }, labelText), input)
}
