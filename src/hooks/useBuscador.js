import { useContext, useEffect, useState } from 'react'
import { SearchContext } from '../context/search'
import { URLS } from '../utils/const'

export function useBuscador () {
  const { ultimaBusqueda, actualizar, setActualizar } = useContext(SearchContext)
  // Estado para controlar las búsquedas.
  // Valor por defecto la referencia de la ultima búsqueda.
  const [busqueda, setBusqueda] = useState(ultimaBusqueda.current)
  // Estado para controlar los resultados, es decir, las películas.
  const [peliculas, setPeliculas] = useState([])
  // Estado para controlar los errores en las búsquedas.
  const [error, setError] = useState('')
  // Efecto
  useEffect(() => {
    // Comprueba que la busqueda no esté vacía
    if (ultimaBusqueda.current.length > 0) {
      // Petición a la API
      obtenerPeliculas({ busqueda: ultimaBusqueda.current })
        // Actualizamos el array de películas.
        .then(peliculas => setPeliculas(peliculas))
    }
  }, [actualizar])

  // Función asíncrona para realizar peticiones a la API
  const obtenerPeliculas = async ({ busqueda }) => {
    // Guardamos la respuesta de la API en una variable
    const respuesta = await fetch(`${URLS.API_BUSCADOR}${busqueda}`)
    // Convertimos la respuesta a formato json
    const json = await respuesta.json()
    // Comprobamos que no haya error
    if (json.Response !== 'False') {
      // Filtramos los resultados para quedarnos sólo con las películas
      const peliculas = json.Search.filter(resultado => resultado.Type === 'movie')
      // Seleccionamos los datos que nos interesan de cada película y los renombramos.
      return peliculas.map(pelicula => ({
        id: pelicula.imdbID,
        titulo: pelicula.Title,
        anho: pelicula.Year,
        foto: pelicula.Poster
      }))
    // Hay error
    } else {
      // Actualizamos el error
      setError(json.Error)
      // Sin películas
      return {}
    }
  }
  // Devolvemos los datos necesarios para los componentes que utilicen el custom hook
  return { peliculas, busqueda, setBusqueda, setPeliculas, obtenerPeliculas, ultimaBusqueda, error, actualizar, setActualizar }
}
