import './CreateEvent.css'
import { el } from '../../utils/dom/el'
import { api } from '../../utils/api/api'
import { createPage } from '../../utils/functions/createPage'
import { navigate } from '../../utils/functions/navigate'
import { Form } from '../../components/Form/Form'

const MAX_IMAGE_MB = 5
const today = () => new Date().toISOString().slice(0, 10)

export const CreateEvent = () => {
  const page = createPage('create-event')

  page.append(
    el('h1', {}, 'Crea tu evento'),
    Form({
      className: 'create-event-form',
      submitText: 'Crear evento',
      loadingText: 'Creando evento…',
      fields: [
        { labelText: 'Título', name: 'title' },
        { labelText: 'Ubicación', name: 'location' },
        { labelText: 'Fecha', name: 'date', type: 'date', min: today() },
        { labelText: 'Cartel del evento (opcional, máx. 5 MB)', name: 'img', type: 'file', required: false, accept: 'image/*' },
        { labelText: 'Descripción', name: 'description', type: 'textarea' }
      ],
      onSubmit: async (form) => {
        const image = form.img.files[0]
        if (image && image.size > MAX_IMAGE_MB * 1024 * 1024) {
          throw new Error(`La imagen pesa demasiado: máximo ${MAX_IMAGE_MB} MB`)
        }
        // multipart/form-data: el backend recibe el fichero con multer
        const event = await api('/events', { method: 'POST', body: new FormData(form) })
        navigate(`/event?id=${event._id}`)
      }
    })
  )
}
