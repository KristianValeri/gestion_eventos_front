import {doRegister} from "../functions/doRegister.js"



const url = 'http://localhost:3000/api/v1'

function showLoading() {
  const loader = document.getElementById('loading')
  if (loader) return

  const newLoader = document.createElement('div')
  newLoader.id = 'loading'
  newLoader.textContent = 'Loading...'
  Object.assign(newLoader.style, {
    position: 'fixed',
    top: '20px',
    right: '20px',
    padding: '10px 20px',
    background: '#000',
    color: '#fff',
    borderRadius: '8px',
    zIndex: '9999'
  })

  document.body.appendChild(newLoader)
}

function hideLoading() {
  document.getElementById('loading')?.remove()
}

export const api = async (endpoint, method = 'GET', body, isJSON = true) => {
  showLoading()

  try {
    const headers = {}
    const token = localStorage.getItem('token')

    if (token) {
      headers.authorization = `Bearer ${token}`
    }

    if (isJSON) {
      headers['Content-Type'] = 'application/json'
    }

    const res = await fetch(`${url}${endpoint}`, {
      method,
      headers,
      body:
        body !== undefined && body !== null
          ? isJSON
            ? JSON.stringify(body)
            : body
          : undefined
    })

    const contentType = res.headers.get('content-type') || ''
    const responseText = await res.text()

    if (!responseText) {
      return null
    }

    let data
    if (contentType.includes('application/json')) {
      data = JSON.parse(responseText)
    } else {
      data = responseText
    }

    if (!res.ok) {
      const message =
        typeof data === 'object' && data !== null
          ? data.message || data.error || 'Request failed'
          : data
      throw new Error(message || `Request failed with status ${res.status}`)
    }

    return data
  } catch (error) {
    console.error('API error:', error)
    throw error
  } finally {
    hideLoading()
  }
}

/* export async function createEventApi(data) {
  try {
    const response = await fetch('http://localhost:3000/api/v1/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`)
    }

    const result = await response.json()
    console.log('Evento creado:', result)

    return result
  } catch (error) {
    console.error('Error enviando evento:', error)
  }
} */
