import { useSeguir } from '../hooks/useSeguir'
import { URLS } from '../utils/const'
import './BotonSeguir.css'

// Componente encargado de renderizar el botón de seguir.
// pelicula: datos de la pelicula.
// setRefresh: para controlar si podemos o no comentar.
// isPerfilUsuario: para diferenciar cuando estamos en el buscador y cuando en el perfil de la película
export function BotonSeguir ({ pelicula, setRefresh, isPerfilPelicula }) {
  // Obtenemos los datos necesarios del custom hook useSeguir.
  const { usuario, boton, siguiendo, setBoton, setSiguiendo } = useSeguir({ pelicula })
  // Variable que controla el estilo del botón.
  const inputClassName = siguiendo
    ? 'movie-form-input is-following'
    : 'movie-form-input'
  // Función para seguir/dejar de seguir
  const actualizarPeliculasUsuario = ({ pelicula, usuario }) => {
    // Creamos una variable para guardar el valor de la accion a realizar
    // let accion = ''
    // No sigue la película
    if (!siguiendo) {
      // Acción
      // accion = 'add'
      // Comprobar que la pelicula está en la base de datos
      fetch(`${URLS.PELICULAS_COMPROBAR_BASE}/${pelicula.id}`)
        .then(respuesta => respuesta.json())
        .then(respuesta => {
          // Si la pelicula está en la base de datos, la seguimos.
          if (respuesta.base) {
            // Petición asíncrona al servidor
            fetch(URLS.PELICULAS_SEGUIR, {
              method: 'POST',
              body: JSON.stringify({ idPelicula: pelicula.id, usuario }),
              headers: {
                'Content-Type': 'application/json'
              }
            })
              .then(respuesta => respuesta.json())
              .then(respuesta => {
                // Comprobamos que estamos siguiendo la película
                if (respuesta.siguiendo) {
                  // Cambiamos el texto del botón
                  setBoton('Siguiendo')
                  // Actualizamos el estado siguiendo
                  setSiguiendo(true)
                  // Si estamos dentro del perfil de la película
                  if (isPerfilPelicula) {
                    // Actualizamos el estado (para poder comentar)
                    setRefresh(true)
                  }
                }
              })
          // La pelicula no está en la base de datos. La añadimos a la base de datos
          } else if (!(respuesta.base)) {
            // Petición asíncrona al servidor
            fetch(URLS.PELICULAS_BASE, {
              method: 'POST',
              body: JSON.stringify({ pelicula }),
              headers: {
                'Content-Type': 'application/json'
              }
            })
              .then(respuesta => respuesta.json())
              .then(respuesta => {
                // Comprobamos que hemos añadido la película a la base de datos. Seguimos la película.
                if (respuesta.anadida) {
                  // Petición asíncrona al servidor
                  fetch(URLS.PELICULAS_SEGUIR, {
                    method: 'POST',
                    body: JSON.stringify({ idPelicula: pelicula.id, usuario }),
                    headers: {
                      'Content-Type': 'application/json'
                    }
                  })
                    .then(respuesta => respuesta.json())
                    .then(respuesta => {
                      // Comprobamos que estamos siguiendo la película
                      if (respuesta.siguiendo) {
                        // Cambiamos el texto del botón
                        setBoton('Siguiendo')
                        // Actualizamos el estado siguiendo
                        setSiguiendo(true)
                        // Si estamos dentro del perfil de la película
                        if (isPerfilPelicula) {
                          // Actualizamos el estado (para poder comentar)
                          setRefresh(true)
                        }
                      }
                    })
                }
              })
          }
        })
    // Si está siguiendo la película. Dejar de seguir
    } else {
      // Acción
      // accion = 'del'
      // Petición asíncrona al servidor
      fetch(URLS.PELICULAS_DEJAR_SEGUIR, {
        method: 'DELETE',
        body: JSON.stringify({ idPelicula: pelicula.id, usuario }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(respuesta => respuesta.json())
        .then(respuesta => {
          // Comprobamos que se ha borrado correctamente
          if (respuesta.borrada) {
            // Cambiamos el texto del botón
            setBoton('Seguir')
            // Actualizamos el estado siguiendo
            setSiguiendo(false)
            // Si estamos dentro del perfil de la película
            if (isPerfilPelicula) {
              // Actualizamos el estado (para no poder comentar)
              setRefresh(false)
            }
          }
        })
    }
  }

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
