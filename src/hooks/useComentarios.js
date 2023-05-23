import { useEffect, useState } from 'react'
import { URLS } from '../utils/const'

export function useComentarios () {
  // Estado para controlar los comentarios
  const [comentarios, setComentarios] = useState([])
  // Estado para controlar que se actualiza el componente.
  // Cuando se añada un comentario haya rerender.
  const [actualizar, setActualizar] = useState('false')
  // Efecto cuando se monta el componente y cada vez que cambia el estado actualizar
  useEffect(() => {
    // Obtenemos la ruta
    const path = window.location.pathname
    // Obtenemos el id de la película de la ruta
    const idPelicula = path.split('/').slice(-1).join('')
    // Petición asíncrona al servidor
    fetch(`${URLS.COMENTARIOS_PELICULA}/${idPelicula}`)
      // Convertimos la respuesta a formato json
      .then(datosComentarios => datosComentarios.json())
      // Comprobamos que haya comentarios
      .then(datosComentarios => {
        if (datosComentarios?.comentarios === false) return
        // Actualizamos el array de comentarios
        setComentarios(datosComentarios)
      })
  }, [actualizar])

  // Devolvemos los datos necesarios para los componentes que utilicen el hook
  return { comentarios, actualizar, setActualizar }
}
