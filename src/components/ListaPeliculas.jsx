import { useEffect, useState } from 'react'
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
  const anchoPantalla = Math.floor(((window.innerWidth * 80 / 100) - 40) / 220)
  const [ultimaPeli, setUltimaPeli] = useState(anchoPantalla)
  const [peliculasFiltro, setPeliculasFiltro] = useState([])
  const [visibleRight, setVisibleRight] = useState(true)
  const [visibleLeft, setVisibleLeft] = useState(false)
  const styleButtonRight = visibleRight ? 'more-button' : 'more-button hidden'
  const styleButtonLeft = visibleLeft ? 'more-button' : 'more-button hidden'

  useEffect(() => {
    setPeliculasFiltro(peliculas.slice(ultimaPeli - anchoPantalla, ultimaPeli))
  }, [ultimaPeli])

  const handleClick = () => {
    if (peliculas.length > ultimaPeli) {
      if (visibleLeft === false) {
        setVisibleLeft(true)
      }
      setUltimaPeli(ultimaPeli + 1)
      setPeliculasFiltro(peliculas.slice(ultimaPeli - anchoPantalla, ultimaPeli))
    }
    if (peliculas.length - ultimaPeli === 1) {
      setVisibleRight(false)
    }
  }

  const handleClickReturn = () => {
    if (ultimaPeli - anchoPantalla > 0) {
      if (visibleRight === false) {
        setVisibleRight(true)
      }
      setUltimaPeli(ultimaPeli - 1)
      setPeliculasFiltro(peliculas.slice(ultimaPeli - anchoPantalla, ultimaPeli))
    }
    if (ultimaPeli - anchoPantalla === 1) {
      setVisibleLeft(false)
    }
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
