import { useAnadirComentario } from '../hooks/useAnadirComentario'
import './AnadirComentario.css'
import { Estrellas } from './Estrellas'

// Componente encargado de renderizar la sección donde poder añadir comentarios
// setActualizar: para actualizar estado del componente padre.
export function AnadirComentario ({ setActualizar }) {
  const { usuario, comentario, setComentario, spoiler, setSpoiler, estrellas, setEstrellas, anadirComentario } = useAnadirComentario({ setActualizar })

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
