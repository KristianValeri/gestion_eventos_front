import { el } from '../../utils/dom/el'
import { api } from '../../utils/api/api'
import { createPage } from '../../utils/functions/createPage'
import { EventCard } from '../../components/EventCard/EventCard'
import { Message } from '../../components/Message/Message'
import { Link } from '../../components/Link/Link'

export const Event = async () => {
  const page = createPage('event')
  const message = Message()
  const loading = el('p', { className: 'loading-text' }, 'Cargando evento…')
  page.append(Link({ text: '← Volver a eventos', to: '/', className: 'back-link' }), message, loading)

  const id = new URLSearchParams(window.location.search).get('id')
  try {
    if (!id) throw new Error('No se ha indicado qué evento mostrar')
    const event = await api(`/events/${id}`)
    loading.replaceWith(EventCard(event, { detailed: true }))
  } catch (error) {
    loading.remove()
    message.show(`No se ha podido cargar el evento: ${error.message}`)
  }
}
