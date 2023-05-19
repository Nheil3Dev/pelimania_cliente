import { useContext, useState } from 'react'
import { SesionContext } from '../context/sesion'
import { URLS } from '../utils/const'

export function useAnadirComentario ({ setActualizar }) {
  // Obtenemos el nombre del usuario que va a comentar
  const { usuario } = useContext(SesionContext)
  // Creamos un estado para controlar el contenido del textarea
  const [comentario, setComentario] = useState('')
  // Creamos un estado para controlar el checkbox de spoiler
  const [spoiler, setSpoiler] = useState(false)
  // Creamos un estado para controlar las estrellas seleccionadas
  const [estrellas, setEstrellas] = useState(0)

  const anadirComentario = ({ comentario, spoiler, estrellas, usuario }) => {
    // Obtenemos la ruta y la guardamos en una variable
    const path = window.location.pathname
    // Obtenemos el id de la pelicula y la guardamos en una variable.
    const idPelicula = path.match(/tt\d{7,8}/).toString()
    // Petición asíncrona al servidor
    fetch(URLS.COMENTARIOS_ANADIR, {
      method: 'POST',
      body: JSON.stringify({ comentario, usuario, idPelicula, spoiler, estrellas }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      // Convertimos la respuesta a formato json
      .then(comentario => comentario.json())
      // Comprobamos que el comentario se ha añadido y reiniciamos los estados a sus valores por defecto
      .then(comentario => {
        if (comentario.anadido) {
          setComentario('')
          setActualizar(prevState => !prevState)
          setEstrellas(0)
          setSpoiler(false)
        }
      })
  }
  return { usuario, comentario, setComentario, spoiler, setSpoiler, estrellas, setEstrellas, anadirComentario }
}
