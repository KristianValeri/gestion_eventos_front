import './CreateEvent.css'
import { createPage } from '../../utils/functions/createPage'

import { FieldForm } from '../../components/FieldForm/FieldForm'
import { Button } from '../../components/Button/Button'
import { api } from '../../utils/api/api'
export const CreateEvent = () => {
  const div = createPage('create-event')

  const form = document.createElement('form')
  form.className = 'create-event-form'

  const button = Button({ text: 'Crear evento', fnc: () => {} })
  button.classList.add('create-event-submit')
  form.appendChild(button)

  form.innerHTML += `
${FieldForm({ labelText: 'Título', type: 'text', required: true, name: 'title' })}
${FieldForm({ labelText: 'Descripción', type: 'text', required: true, name: 'description' })}
${FieldForm({ labelText: 'Fecha', type: 'date', required: true, name: 'date' })}
${FieldForm({ labelText: 'Ubicación', type: 'text', required: true, name: 'location' })}
${FieldForm({ labelText: 'Imagen del evento', type: 'file', required: false, name: 'img' })}
  `

  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    function fileToBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result)
        reader.onerror = reject
        reader.readAsDataURL(file)
      })
    }

    const data = {
      title: form.title.value,
      description: form.description.value,
      date: form.date.value,
      location: form.location.value,
      img: form.img.files[0] ? await fileToBase64(form.img.files[0]) : null
    }

    await api('/events', 'POST', data, true)
  })
  div.appendChild(form)
}
