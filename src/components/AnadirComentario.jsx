import { useContext, useState } from 'react'
import { SesionContext } from '../context/sesion'
import { URLS } from '../utils/const'
import './AnadirComentario.css'
import { Estrellas } from './Estrellas'

// Componente encargado de renderizar la sección donde poder añadir comentarios
// setActualizar: para actualizar estado del componente padre.
export function AnadirComentario ({ setActualizar }) {
  // Obtenemos el nombre del usuario que va a comentar
  const { usuario } = useContext(SesionContext)
  // Creamos un estado para controlar el contenido del textarea
  const [comentario, setComentario] = useState('')
  // Creamos un estado para controlar el checkbox de spoiler
  const [spoiler, setSpoiler] = useState(false)
  // Creamos un estado para controlar las estrellas seleccionadas
  const [estrellas, setEstrellas] = useState(0)

  // Manejador de comentario (textarea)
  const handleChange = (evento) => {
    // Obtenemos el valor del textarea y lo guardamos en una variable
    const nuevoComentario = evento.target.value
    // Actualizamos el estado con el valor obtenido
    setComentario(nuevoComentario)
  }

  // Manejador del evento submit del botón.
  const handleSubmit = (evento) => {
    // Cancelamos el comportamiento por defecto.
    evento.preventDefault()
    // Evitamos que se metan espacios en blanco
    if (comentario.match(/^\s*$/)) {
      setComentario('')
      return
    }
    // Añadimos el comentario.
    anadirComentario({ comentario, spoiler, estrellas, usuario })
  }

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
  return (
    <form
      className='comment-form'
      onSubmit={handleSubmit}
    >
      <textarea
        name='coment'
        onChange={handleChange}
        value={comentario}
        placeholder='Deja tu comentario...'
        maxLength={400}
        required
      />
      <div className='comment-form-footer'>
        <input type='submit' value='Añadir comentario' />
        <div className='comment-form-spoiler'>
          <input
            className='comment-form-spoiler-check'
            onChange={() => setSpoiler(!spoiler)}
            checked={spoiler}
            type='checkbox'
            name='spoiler'
            id='spoiler'
          />
          <label
            htmlFor='spoiler'
            className='comment-form-spoiler-text'
          >
            ¿Contiene spoiler?
          </label>
        </div>
        <Estrellas
          setEstrellas={setEstrellas}
          estrellas={estrellas}
        />
        <p>{comentario.length}/400</p>
      </div>
    </form>
  )
}
