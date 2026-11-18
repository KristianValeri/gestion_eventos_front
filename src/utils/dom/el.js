// Crea un elemento con propiedades, listeners (onClick, onSubmit...) e hijos.
// Los textos se insertan como nodos de texto: nunca se interpreta HTML de datos del usuario (sin XSS).
export const el = (tag, props = {}, ...children) => {
  const element = document.createElement(tag)

  for (const [key, value] of Object.entries(props)) {
    if (value === undefined || value === null || value === false) continue
    if (key.startsWith('on') && typeof value === 'function') {
      element.addEventListener(key.slice(2).toLowerCase(), value)
    } else if (key in element) {
      element[key] = value
    } else {
      element.setAttribute(key, value)
    }
  }

  element.append(...children.flat().filter((child) => child !== null && child !== undefined && child !== false))
  return element
}
