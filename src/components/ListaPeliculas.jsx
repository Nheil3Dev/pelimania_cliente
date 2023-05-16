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
  const [width, setWidth] = useState(window.innerWidth)
  const [anchoPantalla, setAnchoPantalla] = useState(Math.floor(((width * 80 / 100) - 40) / 220))
  const [ultimaPeli, setUltimaPeli] = useState(anchoPantalla)
  const [primeraPeli, setPrimeraPeli] = useState(0)
  const [peliculasFiltro, setPeliculasFiltro] = useState(peliculas.slice(primeraPeli, ultimaPeli))
  const [visibleRight, setVisibleRight] = useState(true)
  const [visibleLeft, setVisibleLeft] = useState(false)
  const styleButtonRight = visibleRight ? 'more-button' : 'more-button hidden'
  const styleButtonLeft = visibleLeft ? 'more-button' : 'more-button hidden'
  console.log('primera Peli: ', primeraPeli)
  console.log('ultima Peli: ', ultimaPeli - 1)
  console.log('ancho array: ', anchoPantalla)

  useEffect(() => {
    const handleResize = (event) => {
      console.log(event.currentTarget.innerWidth)
      const newWidth = event.currentTarget.innerWidth
      setWidth(newWidth)
      const newAnchoPantalla = Math.floor(((newWidth * 75 / 100) - 40) / 220)
      setAnchoPantalla(newAnchoPantalla)
      if (peliculas.length - primeraPeli < newAnchoPantalla) {
        const newUltimaPeli = peliculas.length
        setUltimaPeli(newUltimaPeli)
        const newPrimeraPeli = newUltimaPeli - newAnchoPantalla
        setPrimeraPeli(newPrimeraPeli)
        const newPeliculas = peliculas.slice(newPrimeraPeli, newUltimaPeli)
        setPeliculasFiltro(newPeliculas)
        console.log('hola')
        if (peliculas.length - newUltimaPeli === 0) {
          setVisibleRight(false)
        }
      } else {
        const newUltimaPeli = primeraPeli + newAnchoPantalla
        setUltimaPeli(newUltimaPeli)
        const newPeliculas = peliculas.slice(primeraPeli, newUltimaPeli)
        setPeliculasFiltro(newPeliculas)
        if (peliculas.length - newUltimaPeli > 0) {
          setVisibleRight(true)
        } else {
          setVisibleRight(false)
        }
      }
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [width])

  const handleClick = () => {
    if (peliculas.length > ultimaPeli) {
      if (visibleLeft === false) {
        setVisibleLeft(true)
      }
      const newUltimaPeli = ultimaPeli + 1
      const newPrimeraPeli = primeraPeli + 1
      setUltimaPeli(newUltimaPeli)
      setPrimeraPeli(newPrimeraPeli)
      setPeliculasFiltro(peliculas.slice(newPrimeraPeli, newUltimaPeli))
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
      const newUltimaPeli = ultimaPeli - 1
      const newPrimeraPeli = primeraPeli - 1
      setUltimaPeli(newUltimaPeli)
      setPrimeraPeli(newPrimeraPeli)
      setPeliculasFiltro(peliculas.slice(newPrimeraPeli, newUltimaPeli))
      if (newPrimeraPeli === 0) {
        setVisibleLeft(false)
      }
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
