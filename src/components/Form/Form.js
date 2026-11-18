import './Form.css'
import { el } from '../../utils/dom/el'
import { Button } from '../Button/Button'
import { FieldForm } from '../FieldForm/FieldForm'
import { Message } from '../Message/Message'
import { withLoading } from '../../utils/functions/withLoading'

// Formulario genérico: pinta los campos, bloquea el botón mientras envía y
// SIEMPRE informa al usuario del resultado (error o éxito) en su zona de mensajes.
export const Form = ({ fields, submitText, loadingText = 'Enviando…', onSubmit, className = '' }) => {
  const message = Message()
  const submit = Button({ text: submitText, type: 'submit', className: 'form-submit' })

  const form = el(
    'form',
    {
      className: `form ${className}`.trim(),
      onSubmit: async (e) => {
        e.preventDefault()
        message.clear()
        try {
          const successText = await withLoading(submit, loadingText, () => onSubmit(form))
          if (successText) message.show(successText, 'success')
        } catch (error) {
          message.show(error.message || 'Ha ocurrido un error inesperado')
        }
      }
    },
    fields.map(FieldForm),
    message,
    submit
  )
  return form
}
