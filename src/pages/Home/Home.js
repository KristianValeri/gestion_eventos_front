import './Home.css'
import { el } from '../../utils/dom/el'
import { api } from '../../utils/api/api'
import { isLogged } from '../../utils/session/session'
import { createPage } from '../../utils/functions/createPage'
import { EventCard } from '../../components/EventCard/EventCard'
import { Message } from '../../components/Message/Message'
import { Button } from '../../components/Button/Button'
import { navigate } from '../../utils/functions/navigate'

const SORT_OPTIONS = [
  ['date', 'Fecha: próximos primero'],
  ['-date', 'Fecha: más lejanos primero'],
  ['title', 'Título: A-Z'],
  ['-title', 'Título: Z-A'],
  ['recent', 'Publicados recientemente']
]

export const Home = () => {
  const page = createPage('home')
  const message = Message()
  const list = el('div', { className: 'event-list' })

  const loadEvents = async () => {
    message.clear()
    list.replaceChildren(el('p', { className: 'loading-text' }, 'Cargando eventos…'))
    try {
      const events = await api(`/events?sort=${sort.value}`)
      list.replaceChildren(...events.map((event) => EventCard(event)))
      if (!events.length) message.show('Todavía no hay eventos publicados.', 'info')
    } catch (error) {
      list.replaceChildren()
      message.show(`No se han podido cargar los eventos: ${error.message}`)
    }
  }

  const sort = el(
    'select',
    { id: 'sort', onChange: loadEvents },
    SORT_OPTIONS.map(([value, text]) => el('option', { value }, text))
  )

  page.append(
    el(
      'div',
      { className: 'home-toolbar' },
      el('h1', {}, 'Eventos'),
      el('label', { className: 'sort-label', htmlFor: 'sort' }, 'Ordenar por ', sort),
      isLogged() ? Button({ text: '+ Crear evento', onClick: () => navigate('/events/new') }) : null
    ),
    message,
    list
  )

  loadEvents()
}
