import './PopUp.css'

// Componente encargado de renderizar una ventana emergente de confirmación.
// elemento: usuario/comentario a borrar
// borrarElemento: función para borrar usuario/comentario
// setVisible: para cambiar el estado visible
// setBlur: para cambiar el estado blur
export function PopUp ({ props }) {
  // Desestructuramos las props
  const { elemento, borrarElemento, setVisible, setBlur } = props
  // Manejador del evento onClick del botón 'Borrar'
  const handleClick = () => {
    // Borramos el usuario/comentario
    borrarElemento(elemento)
    // Hacemos que desaparezca el pop up.
    setVisible(false)
    // Quitamos el efecto blur del fondo.
    setBlur(false)
  }

  // Manejador del evento onClick del botón 'Cancelar'
  const handleClickCancel = () => {
    // Hacemos que desaparezca el pop up.
    setVisible(false)
    // Quitamos el efecto blur del fondo.
    setBlur(false)
  }
  return (
    <div className='pop-up'>
      <div className='pop-up-container'>
        <p>¿Estás seguro de borrar?</p>
        <div className='pop-up-buttons'>
          <button className='pop-up-delete-button' onClick={handleClick}>Borrar</button>
          <button className='pop-up-delete-button' onClick={handleClickCancel}>Cancelar</button>
        </div>
      </div>
    </div>
  )
}
