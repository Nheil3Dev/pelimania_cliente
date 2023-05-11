import { useContext, useEffect, useState } from 'react'
import { SesionContext } from '../context/sesion'
import { URLS } from '../utils/const'

export function usePelicula () {
  // Obtenemos el usuario del contexto
  const { usuario } = useContext(SesionContext)
  // Creamos un estado para controlar si podemos comentar (siguiendo->si; sin siguir->no)
  const [siguiendo, setSiguiendo] = useState(false)
  // Obtenemos la ruta
  const path = window.location.pathname
  // Sacamos el id de la pelicula de la ruta
  const id = path.match(/tt\d{7,8}/)?.toString() || ''
  // Estado para controlar los datos de la película.
  // El dato por defecto es un id que nos hace falta para la funcionalidad del botón de seguir.
  const [pelicula, setPelicula] = useState({ id })

  // Efecto cada vez que se monta el componente
  useEffect(() => {
    // Obtenemos la ruta
    const path = window.location.pathname
    // Obtenemos el id de la película de la ruta
    const idPelicula = path.match(/tt\d{7,8}/).toString()
    // Petición asíncrona al servidor
    fetch(`${URLS.PELICULAS_COMPROBAR}/${usuario}/${idPelicula}`)
      // Convertimos la respuesta a formato json
      .then(respuesta => respuesta.json())
      // Comprobamos que estamos siguiendo para poder comentar
      .then(respuesta => {
        if (respuesta.siguiendo) {
          setSiguiendo(true)
        } else {
          setSiguiendo(false)
        }
      })
  }, [])

  // Efecto cada vez que se monte el componente
  useEffect(() => {
    // URL a la API genérica para cualquier película.
    const url = `${URLS.API_ID}${id}`
    // Petición asíncrona a la API
    fetch(url)
      // Convertimos la respuesta a formato json
      .then(pelicula => pelicula.json())
      // Extraemos los datos que nos interesan y los renombramos
      .then(pelicula => ({
        id: pelicula.imdbID,
        titulo: pelicula.Title,
        anho: pelicula.Year,
        foto: pelicula.Poster,
        nota: pelicula.imdbRating,
        generos: pelicula.Genre,
        duracion: pelicula.Runtime,
        lanzamiento: pelicula.Released,
        director: pelicula.Director,
        actores: pelicula.Actors,
        escritores: pelicula.Writer,
        resumen: pelicula.Plot,
        premios: pelicula.Awards
      }))
      // Actualizamos los datos de la película
      .then(pelicula => setPelicula(pelicula))
  }, [])

  // Devolvemos los datos necesarios para el componente que utiliza el hook
  return { pelicula, siguiendo, setSiguiendo }
}
