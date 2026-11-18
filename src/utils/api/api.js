import { clearSession, getToken } from '../session/session'

export const API_ORIGIN = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'
const API_URL = `${API_ORIGIN}`

// Loader global: un contador para que con varias peticiones a la vez no se oculte antes de tiempo
let pending = 0
const loader = () =>
  document.getElementById('global-loader') ??
  document.body.appendChild(Object.assign(document.createElement('div'), { id: 'global-loader', textContent: 'Cargando…' }))

const setLoading = (delta) => {
  pending += delta
  loader().classList.toggle('visible', pending > 0)
}

const parseBody = async (res) => {
  const text = await res.text()
  if (!text) return null
  try {
    return JSON.parse(text)
  } catch {
    return text
  }
}

// Única función de fetch de la app. body puede ser un objeto (se envía como JSON) o un FormData (ficheros).
export const api = async (endpoint, { method = 'GET', body } = {}) => {
  const headers = {}
  const token = getToken()
  if (token) headers.Authorization = `Bearer ${token}`

  const isFormData = body instanceof FormData
  if (body !== undefined && !isFormData) headers['Content-Type'] = 'application/json'

  setLoading(+1)
  try {
    let res
    try {
      res = await fetch(`${API_URL}${endpoint}`, {
        method,
        headers,
        body: body === undefined || isFormData ? body : JSON.stringify(body)
      })
    } catch {
      throw new Error('No se ha podido conectar con el servidor. Comprueba tu conexión o que el backend esté arrancado.')
    }

    const data = await parseBody(res)

    if (!res.ok) {
      if (res.status === 401 && token) {
        clearSession()
        throw new Error('Tu sesión ha caducado. Vuelve a iniciar sesión.')
      }
      throw new Error(data?.message || `Error inesperado del servidor (${res.status})`)
    }
    return data
  } finally {
    setLoading(-1)
  }
}

// URL de una imagen guardada por el backend (o una antigua en base64 / absoluta)
export const assetUrl = (path) => {
  if (!path) return null
  return /^(data:|https?:)/.test(path) ? path : `${API_ORIGIN}${path}`
}
