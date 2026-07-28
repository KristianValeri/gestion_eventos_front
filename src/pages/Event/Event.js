import './Event.css'
import { api } from '../../utils/api/api'
import { createPage } from '../../utils/functions/createPage'
import { formatDate } from '../../utils/functions/formatDate'

const getCurrentUser = () => {
  try {
    return JSON.parse(localStorage.getItem('user'))
  } catch {
    return null
  }
}

const renderEvent = (div, event) => {
  const token = localStorage.getItem('token')
  const user = getCurrentUser()
  const participants = event.participants || []
  const isParticipating = !!user && participants.some((p) => p._id === user._id)

  const participantsList = participants.length
    ? `<ul class="event-participants-list">
        ${participants.map((p) => `<li>${p.username}</li>`).join('')}
      </ul>`
    : '<p class="event-no-participants">Todavía no hay participantes. ¡Sé el primero!</p>'

  let actionHtml
  if (!token) {
    actionHtml = `<p class="event-login-hint">
      <a href="/login" class="event-login-link">Inicia sesión</a> para participar en este evento.
    </p>`
  } else if (isParticipating) {
    actionHtml = `
      <p class="event-participating">✅ Ya participas en este evento</p>
      <button class="main-button event-participate-btn" data-action="leave">Cancelar participación</button>
    `
  } else {
    actionHtml = `<button class="main-button event-participate-btn" data-action="join">Participar</button>`
  }

  div.innerHTML = `
    <div class="event-card event-detail">
      <img src="${event.img}" alt="${event.title}" class="event-image" />
      <h2>${event.title}</h2>
      <p>${event.description}</p>
      <p><strong>Fecha:</strong> ${formatDate(event.date)}</p>
      <p><strong>Ubicación:</strong> ${event.location}</p>
      <div class="event-participants">
        <h3>Participantes (${participants.length})</h3>
        ${participantsList}
        ${actionHtml}
      </div>
      <a href="/" class="event-back">← Volver a eventos</a>
    </div>
  `

  const participateBtn = div.querySelector('.event-participate-btn')
  if (participateBtn) {
    participateBtn.addEventListener('click', async () => {
      const action = participateBtn.dataset.action
      try {
        const updated = await api(
          `/events/${event._id}/participants`,
          action === 'join' ? 'POST' : 'DELETE'
        )
        renderEvent(div, updated)
      } catch (error) {
        console.error('Error updating participation:', error)
      }
    })
  }

  const loginLink = div.querySelector('.event-login-link')
  if (loginLink) {
    loginLink.addEventListener('click', async (e) => {
      e.preventDefault()
      window.history.pushState('', '', '/login')
      const { Login } = await import('../Login/Login')
      Login()
    })
  }

  div.querySelector('.event-back').addEventListener('click', async (e) => {
    e.preventDefault()
    window.history.pushState('', '', '/')
    const { Home } = await import('../Home/Home')
    Home()
  })
}

export const Event = async () => {
  const div = createPage('event')

  const params = new URLSearchParams(window.location.search)
  const _id = params.get('id')

  try {
    const event = await api(`/events/${_id}`, 'GET')
    renderEvent(div, event)
  } catch (error) {
    console.error('Error fetching event:', error)
    div.innerHTML = `
      <div class="event-card event-detail">
        <h2>Evento no encontrado</h2>
        <p>No se pudo cargar el evento.</p>
        <a href="/" class="event-back">← Volver a eventos</a>
      </div>
    `
    div.querySelector('.event-back').addEventListener('click', async (e) => {
      e.preventDefault()
      window.history.pushState('', '', '/')
      const { Home } = await import('../Home/Home')
      Home()
    })
  }

  return div
}
