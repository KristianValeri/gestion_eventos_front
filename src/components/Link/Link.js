import { el } from '../../utils/dom/el'
import { navigate } from '../../utils/functions/navigate'

// Enlace interno de la SPA: cambia de página sin recargar
export const Link = ({ text, to, className, onClick }) =>
  el(
    'a',
    {
      href: to,
      className,
      onClick: (e) => {
        e.preventDefault()
        onClick ? onClick() : navigate(to)
      }
    },
    text
  )
