import './EventCard.css'
import { el } from '../../utils/dom/el'
import { assetUrl } from '../../utils/api/api'
import { formatDate } from '../../utils/functions/formatDate'
import { Link } from '../Link/Link'
import { AttendButton } from '../AttendButton/AttendButton'
import { AttendeesList } from '../AttendeesList/AttendeesList'

// Tarjeta de evento. detailed = vista de detalle (descripción completa + lista de asistentes).
// Se repinta sola al confirmar o cancelar asistencia.
export const EventCard = (event, { detailed = false } = {}) => {
  const card = el('article', { className: `event-card ${detailed ? 'detailed' : ''}`.trim() })

  const render = (current) => {
    const img = assetUrl(current.img)
    card.replaceChildren(
      img ? el('img', { src: img, alt: current.title, className: 'event-image', loading: 'lazy' }) : null,
      el(
        'div',
        { className: 'event-body' },
        el('h2', {}, detailed ? current.title : Link({ text: current.title, to: `/event?id=${current._id}` })),
        el('p', { className: 'event-meta' }, `📅 ${formatDate(current.date)}  ·  📍 ${current.location}`),
        el('p', { className: 'event-description' }, current.description),
        detailed && current.createdBy?.username
          ? el('p', { className: 'event-meta' }, `Organiza: ${current.createdBy.username}`)
          : null,
        detailed
          ? AttendeesList(current.participants)
          : el('p', { className: 'event-meta' }, `👥 ${current.participants.length} asistentes`),
        AttendButton({ event: current, onChange: (updated) => render({ ...current, participants: updated.participants }) })
      )
    )
  }

  render(event)
  return card
}
