import { useContext, useEffect, useState } from 'react'
import { SesionContext } from '../context/sesion'
import { URLS } from '../utils/const'

export function useSeguir ({ pelicula, setRefresh, isPerfilPelicula }) {
  // Obtenemos el nombre de usuario del contexto
  const { usuario } = useContext(SesionContext)
  // Estado para controlar el texto del botón
  const [boton, setBoton] = useState('Seguir')
  // Estado para controlar si el usuario está siguiendo una película
  const [siguiendo, setSiguiendo] = useState(false)

  // Efecto cada vez que se monta el componente
  useEffect(() => {
    // Petición asíncrona al servidor para comprobar si el usuario sigue la película
    fetch(`${URLS.PELICULAS_COMPROBAR}/${usuario}/${pelicula.id}`)
      // Convertimos la respuesta a formato json
      .then(peliculas => peliculas.json())
      // Comprobamos si está siguiendo la película
      .then(peliculas => {
        if (peliculas.siguiendo) {
          // Actualizamos el estado siguiendo
          setSiguiendo(true)
          // Actualizamos el texto del botón
          setBoton('Siguiendo')
        }
      })
  }, [])

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

  // Devolvemos los datos necesarios para los componentes que utilicen el hook.
  return { siguiendo, boton, setBoton, setSiguiendo, usuario, actualizarPeliculasUsuario }
}
