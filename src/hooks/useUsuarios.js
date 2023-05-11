import { useState } from 'react'
import { URLS } from '../utils/const'

export function useUsuarios ({ setBorrado }) {
  // Estado para controlar la visibilidad del pop up
  const [visible, setVisible] = useState(false)
  // Estado para controlar el usuario que se tiene que borrar
  const [usuarioBorrar, setUsuarioBorrar] = useState('')
  // Estado para controlar el estilo del background de los usuarios
  const [blur, setBlur] = useState(false)
  // Función para borrar usuario de la base de datos
  const borrarUsuario = (usuario) => {
    // Petición asíncrona al servidor
    fetch(URLS.USUARIOS_BORRAR, {
      method: 'DELETE',
      body: JSON.stringify({ usuario }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      // Convertimos la respuesta a formato json
      .then(respuesta => respuesta.json())
      // Actualizamos el estado borrado para que se actualice la lista de usuarios.
      .then(respuesta => setBorrado(lastState => !lastState))
  }

  return { visible, setVisible, usuarioBorrar, setUsuarioBorrar, setBlur, blur, borrarUsuario }
}
