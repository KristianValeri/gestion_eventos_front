import './Home.css'
import { api } from '../../utils/api/api'
import { createPage } from '../../utils/functions/createPage'
import { formatDate } from '../../utils/functions/formatDate'
import { Event } from '../Event/Event'

export const Home = async () => {
  const div = createPage('home')

  try {
    let events = await api('/events', 'GET')

    for (const event of events) {
      div.innerHTML += `
  <div class="event-card">
    <h2>
      <a href="/event?id=${event._id}">
        ${event.title}
      </a>
    </h2>
    <p>${event.description}</p>
    <p>${formatDate(event.date)}</p>
    <p>${event.location}</p>
    <img
      src="${event.img}"
      alt="${event.title}"
      class="event-image"
    />
  </div>
 `
    }

    div.querySelectorAll('.event-card a').forEach((link) => {
      link.addEventListener('click', async (e) => {
        e.preventDefault()
        window.history.pushState('', '', link.getAttribute('href'))
        Event()
      })
    })
  } catch (error) {
    console.error('Error fetching events:', error)
    div.innerHTML = `<p class="error-message">No se pudieron cargar los eventos. ¿Está el servidor arrancado?</p>`
  }
  return div
}
