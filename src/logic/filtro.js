// Función para filtrar comentarios
// comentarios: array de comentarios a filtrar
// usuarioFiltro: opción seleccionada del filtro usuarios.
// peliculaFiltro: opción seleccionada del fitro películas.
// estrellas filtro: opción seleccionada del filtro estrellas.
export const filtrarComentarios = ({ comentarios, usuarioFiltro, peliculaFiltro, estrellasFiltro }) => {
  // Guardamos el resultado de filtrar el array en una nueva variable.
  const comentariosModificados = comentarios.length > 0
    ? comentarios
    // Método filter
      .filter(comentario => {
      // Comprobamos que la opción seleccionada no sea todos (no habría que filtrar)
        if (usuarioFiltro !== 'Todos') {
        // Devuelve los comentarios del usuario seleccionado
          return comentario.usuario === usuarioFiltro
        } else return true // Devuelve todos
      })
    // Método filter
      .filter(comentario => {
      // Comprobamos que la opción seleccionada no sea todas
        if (peliculaFiltro !== 'Todas') {
        // Devuelve los comentarios de la película seleccionada
          return comentario.titulo === peliculaFiltro
        } else return true // Devuelve todos
      })
    // Método filter
      .filter(comentario => {
      // Comprobamos que la opción seleccionada no sea todas
        if (estrellasFiltro !== 'Todas') {
        // Devuelve los comentarios con la puntuación seleccionada
          return comentario.estrellas === Number(estrellasFiltro)
        } else return true// Devuelve todos
      })
    : []
  // Devolvemos los comentarios filtrados
  return comentariosModificados
}
