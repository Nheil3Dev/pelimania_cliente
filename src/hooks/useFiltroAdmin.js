import { useEffect, useState } from 'react'
import { filtrarComentarios } from '../logic/filtro'
import { URLS } from '../utils/const'

export function useFiltroAdmin ({ borrado }) {
  // Estado para controlar los comentarios
  const [comentarios, setComentarios] = useState([])
  // Estado para controlar el filtro de los usuarios
  const [usuarioFiltro, setUsuarioFiltro] = useState('Todos')
  // Estado para controlar el filtro de las películas
  const [peliculaFiltro, setPeliculaFiltro] = useState('Todas')
  // Estado para controlar el filtro de las estrellas
  const [estrellasFiltro, setEstrellasFiltro] = useState('Todas')
  // Estado para controlar los comentarios ya filtrados
  const [comentariosFiltro, setComentariosFiltro] = useState(comentarios)

  // Creo un array solamente con el titulo de las peliculas
  const peliculasComentarios = comentarios.length > 0 ? comentarios.map(comentario => comentario.titulo) : []
  // Lo convierto a un Set para quitarme los titulos duplicados
  const peliculasSet = new Set(peliculasComentarios)
  // Lo vuelvo a convertir en array con spread operator para utilizar los métodos de array
  const peliculas = [...peliculasSet]

  // Efecto cada vez que se cambie algún filtro
  useEffect(() => {
    // Llamamos a la función que se encarga del filtrado de los comentarios
    const comentariosModificados = filtrarComentarios({ comentarios, peliculaFiltro, usuarioFiltro, estrellasFiltro })
    // Actualizamos el array de los comentarios ya filtrados
    setComentariosFiltro(comentariosModificados)
  }, [usuarioFiltro, peliculaFiltro, estrellasFiltro, comentarios])

  // Efecto cada vez que se borre un comentario
  useEffect(() => {
    // Petición asíncrona al servidor
    fetch(URLS.COMENTARIOS_ADMIN)
      // Convertimos la respuesta a json
      .then(comentarios => comentarios.json())
      // Actualizamos el array de comentarios
      .then(comentarios => setComentarios(comentarios))
  }, [borrado])

  // Devolvemos los datos necesarios para el componente que utiliza el hook
  return { peliculas, comentarios, setComentarios, usuarioFiltro, setUsuarioFiltro, peliculaFiltro, setPeliculaFiltro, estrellasFiltro, setEstrellasFiltro, comentariosFiltro, setComentariosFiltro }
}
