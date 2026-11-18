import './AttendeesList.css'
import { el } from '../../utils/dom/el'

export const AttendeesList = (participants = []) =>
  el(
    'div',
    { className: 'attendees' },
    el('h3', {}, `Asistentes (${participants.length})`),
    participants.length
      ? el('ul', {}, participants.map((p) => el('li', {}, p.username)))
      : el('p', { className: 'attendees-empty' }, 'Todavía no se ha apuntado nadie. ¡Sé el primero!')
  )
