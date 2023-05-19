import { usePeliculasPerfil } from '../hooks/usePeliculasPerfil'
import './ListaPeliculas.css'
import { Pelicula } from './Pelicula'

// Componente encargado de renderizar un listado de películas.
// peliculas: peliculas de la lista
// isUser: es verdadero cuando el componente se usa en el perfil de usuario.
export function ListaPeliculas ({ peliculas, isUser }) {
  return (
    <>
      {isUser
        ? <ListaPeliculasUsuario peliculas={peliculas} isUser={isUser} />
        : <ListaPeliculasBuscador peliculas={peliculas} />}
    </>

  )
}

export function ListaPeliculasBuscador ({ peliculas }) {
  return (
    <>
      <div className='movies-container'>
        <ul className='movies-container-list'>
          {
            peliculas.map(pelicula => (
              <li key={pelicula.id}>
                <Pelicula pelicula={pelicula} />
              </li>
            ))
          }
        </ul>
      </div>
    </>
  )
}

export function ListaPeliculasUsuario ({ peliculas, isUser }) {
  const {
    visibleLeft,
    visibleRight,
    anchoPantalla,
    peliculasFiltro,
    avanzaPelicula,
    retrocedePelicula
  } = usePeliculasPerfil({ peliculas })

  const styleButtonRight = visibleRight ? 'more-button' : 'more-button hidden'
  const styleButtonLeft = visibleLeft ? 'more-button' : 'more-button hidden'

  // console.log('primera Peli: ', primeraPeli)
  // console.log('ultima Peli: ', ultimaPeli - 1)
  // console.log('ancho array: ', anchoPantalla)

  const handleClick = () => {
    avanzaPelicula()
  }

  const handleClickReturn = () => {
    retrocedePelicula()
  }

  return (
    <>
      <div className='movies-container-user'>
        {peliculas.length > anchoPantalla &&
          <button
            className={styleButtonLeft}
            onClick={handleClickReturn}
          >{'<'}
          </button>}
        <ul className='movies-container-list-user'>
          {
            peliculasFiltro.map(pelicula => (
              <li key={pelicula.id}>
                <Pelicula pelicula={pelicula} isUser={isUser} />
              </li>
            ))
          }
        </ul>
        {peliculas.length > anchoPantalla &&
          <button
            className={styleButtonRight}
            onClick={handleClick}
          >
            {'>'}
          </button>}
      </div>
    </>
  )
}
