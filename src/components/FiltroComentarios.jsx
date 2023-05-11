// Componente que se encarga de renderizar los filtros de los comentarios de la sección de administración
// setPeliculaFiltro: actualiza el valor del filtro de las películas
// setUsuarioFiltro: actualiza el valor del filtro de los usuarios
// setEstrellasFiltro: actualiza el valor del filtro de las estrellas
// peliculas: listado de todas las películas
// usuarios: listado de todos los usuarios
export function FiltroComentarios ({ props }) {
  // Desestructuramos las props
  const { setPeliculaFiltro, setUsuarioFiltro, setEstrellasFiltro, peliculas, usuarios } = props

  // Manejador del evento onChange del filtro Peliculas
  const handleChangePelicula = (evento) => {
    // Guardamos en una variable la opción selecionada.
    const filtroPelicula = evento.target.value
    // Actualizamos el estado.
    setPeliculaFiltro(filtroPelicula)
  }

  // Manejador del evento onChange del filtro Usuarios
  const handleChangeUsuario = (evento) => {
    // Guardamos en una variable la opción seleccionada.
    const filtroUsuario = evento.target.value
    // Actualizamos el estado.
    setUsuarioFiltro(filtroUsuario)
  }

  // Manejador del evento onChange del filtro Estrellas
  const handleChangeEstrellas = (evento) => {
    // Guardamos en una variable la opción seleccionada.
    const filtroEstrellas = evento.target.value
    // Actualizamos el estado.
    setEstrellasFiltro(filtroEstrellas)
  }

  return (
    <form className='admin-comments-form'>
      <div className='first-filter'>
        <label>Película</label>
        <select onChange={handleChangePelicula}>
          <option>Todas</option>
          {peliculas.map(pelicula =>
            <option key={pelicula} value={pelicula}>
              {pelicula}
            </option>
          )}
        </select>
      </div>
      <div className='second-filter'>
        <label>Usuario</label>
        <select onChange={handleChangeUsuario}>
          <option>Todos</option>
          {usuarios.map(usuario =>
            <option key={usuario.usuario} value={usuario.usuario}>
              {usuario.usuario}
            </option>)}
        </select>
      </div>
      <div className='third-filter'>
        <label>Estrellas</label>
        <select onChange={handleChangeEstrellas}>
          <option>Todas</option>
          <option>0</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>
      </div>
    </form>
  )
}
