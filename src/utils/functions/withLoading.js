// Desactiva el botón y cambia su texto mientras dura la acción asíncrona (feedback inmediato y sin dobles envíos)
export const withLoading = async (button, loadingText, action) => {
  const originalText = button.textContent
  button.disabled = true
  button.textContent = loadingText
  try {
    return await action()
  } finally {
    button.disabled = false
    button.textContent = originalText
  }
}
