import { useSeguir } from '../hooks/useSeguir'
import './BotonSeguir.css'

// Componente encargado de renderizar el botón de seguir.
// pelicula: datos de la pelicula.
// setRefresh: para controlar si podemos o no comentar.
// isPerfilUsuario: para diferenciar cuando estamos en el buscador y cuando en el perfil de la película
export function BotonSeguir ({ pelicula, setRefresh, isPerfilPelicula }) {
  // Obtenemos los datos necesarios del custom hook useSeguir.
  const { usuario, boton, siguiendo, setBoton, actualizarPeliculasUsuario } = useSeguir({ pelicula, setRefresh, isPerfilPelicula })
  // Variable que controla el estilo del botón.
  const inputClassName = siguiendo
    ? 'movie-form-input is-following'
    : 'movie-form-input'

  // Manejador del evento submit del botón.
  const handleSubmitFilm = (evento) => {
    // Cancelamos el comportamiento por defecto.
    evento.preventDefault()
    // Seguimos o dejamos de seguir la película.
    actualizarPeliculasUsuario({ pelicula, usuario })
  }

  return (
    <form onSubmit={handleSubmitFilm} className='movie-form'>
      <input
        type='submit'
        value={boton}
        className={inputClassName}
        onMouseOver={() => {
          if (siguiendo) setBoton('Dejar de seguir')
        }}
        onMouseOut={() => {
          if (siguiendo) setBoton('Siguiendo')
          else if (!siguiendo) setBoton('Seguir')
        }}
      />
    </form>
  )
}
