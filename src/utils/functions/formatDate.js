// "2026-08-15T00:00:00.000Z" -> "15 de agosto de 2026"
export const formatDate = (value) => {
  const date = new Date(value)
  if (!value || Number.isNaN(date.getTime())) return ''
  return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })
}
