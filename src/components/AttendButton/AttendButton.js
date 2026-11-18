import { el } from '../../utils/dom/el'
import { api } from '../../utils/api/api'
import { getUser, isLogged } from '../../utils/session/session'
import { withLoading } from '../../utils/functions/withLoading'
import { Button } from '../Button/Button'
import { Message } from '../Message/Message'
import { Link } from '../Link/Link'

const idOf = (participant) => participant?._id ?? participant

export const isAttending = (event) => event.participants.some((p) => idOf(p) === getUser()?._id)

// Confirmar / cancelar asistencia. Sin sesión, invita a iniciarla.
export const AttendButton = ({ event, onChange }) => {
  if (!isLogged()) {
    return Link({ text: 'Inicia sesión para apuntarte', to: '/login', className: 'attend-login' })
  }

  const message = Message()
  const button = Button({
    text: isAttending(event) ? 'Cancelar asistencia' : 'Confirmar asistencia',
    className: isAttending(event) ? 'secondary' : '',
    onClick: async () => {
      message.clear()
      try {
        const updated = await withLoading(button, 'Guardando…', () =>
          api(`/events/${event._id}/participate`, { method: isAttending(event) ? 'DELETE' : 'POST' })
        )
        onChange(updated)
      } catch (error) {
        message.show(error.message)
      }
    }
  })

  return el('div', { className: 'attend' }, button, message)
}
