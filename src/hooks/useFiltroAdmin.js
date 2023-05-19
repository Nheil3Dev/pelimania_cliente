import { useContext, useEffect, useState } from 'react'
import { AdminFiltersContext } from '../context/adminFilters'
import { filtrarComentarios } from '../logic/filtro'

export function useFiltroAdmin ({ comentarios }) {
  // Estado para controlar los comentarios ya filtrados
  const [comentariosFiltro, setComentariosFiltro] = useState(comentarios)
  const { peliculaFiltro, usuarioFiltro, estrellasFiltro } = useContext(AdminFiltersContext)

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

  // Devolvemos los datos necesarios para el componente que utiliza el hook
  return { peliculas, comentariosFiltro }
}
