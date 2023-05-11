import { useContext, useEffect, useState } from 'react'
import { SesionContext } from '../context/sesion'
import { URLS } from '../utils/const'

export function useSeguir ({ pelicula }) {
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

  // Devolvemos los datos necesarios para los componentes que utilicen el hook.
  return { siguiendo, boton, setBoton, setSiguiendo, usuario }
}
