import { useEffect, useState } from 'react'
import { URLS } from '../utils/const'

export function useComentariosAdmin () {
  // Estado para controlar los comentarios
  const [comentarios, setComentarios] = useState([])
  // Estado para controlar que comentario hay que borrar
  const [comentarioBorrar, setComentarioBorrar] = useState([])
  // Estado para controlar que se ha borrado el comentario
  const [borrado, setBorrado] = useState(false)
  // Estado para controlar la visibilidad del pop up
  const [visible, setVisible] = useState(false)
  // Estado para controlar el estilo del background de los comentarios
  const [blur, setBlur] = useState(false)

  // Efecto cada vez que se borre un comentario
  useEffect(() => {
    // Petición asíncrona al servidor
    fetch(URLS.COMENTARIOS_ADMIN)
    // Convertimos la respuesta a json
      .then(comentarios => comentarios.json())
    // Actualizamos el array de comentarios
      .then(comentarios => setComentarios(comentarios))
  }, [borrado])

  // Función para borrar comentarios
  const borrarComentario = (comment) => {
    // Petición asíncrona al servidor
    fetch(URLS.COMENTARIO_BORRAR, {
      method: 'DELETE',
      body: JSON.stringify(comment),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      // Convertimos la resuesta a formato json
      .then(respuesta => respuesta.json())
      // Comprobamos que se ha borrado y actualizamos el estado (para rerender de la lista de comentarios)
      .then(respuesta => {
        if (respuesta.borrado) {
          setBorrado(estadoAnterior => !estadoAnterior)
        }
      })
  }

  // Devuelve los datos necesarios para el componente que utilizará el hook
  return { comentarios, borrado, setBorrado, visible, setVisible, blur, setBlur, comentarioBorrar, setComentarioBorrar, borrarComentario }
}
