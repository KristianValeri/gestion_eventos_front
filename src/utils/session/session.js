const TOKEN_KEY = 'token'
const USER_KEY = 'user'

export const SESSION_CHANGE = 'session-change'

const notify = () => window.dispatchEvent(new Event(SESSION_CHANGE))

export const getToken = () => localStorage.getItem(TOKEN_KEY)

export const getUser = () => {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY))
  } catch {
    return null
  }
}

export const isLogged = () => Boolean(getToken())

export const saveSession = ({ token, user }) => {
  localStorage.setItem(TOKEN_KEY, token)
  localStorage.setItem(USER_KEY, JSON.stringify(user))
  notify()
}

export const clearSession = () => {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
  notify()
}
