import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../utils/const'
import { BotonSeguir } from './BotonSeguir'
import './Pelicula.css'

// Componente que se encarga de renderizar una película en el Buscador.
// pelicula: datos de la película.
export function PeliculaBuscador ({ pelicula }) {
  return (
    <>
      <article className='movie-container'>
        <PeliculaPerfil pelicula={pelicula} />
        <BotonSeguir pelicula={pelicula} />
      </article>
    </>
  )
}

// Componente que se encarga de renderizar una película en el perfil de Usuario.
// pelicula: datos de la película
export function PeliculaPerfil ({ pelicula }) {
  const [selected, setSelected] = useState(false)
  const style = selected ? 'movie-info-user' : 'movie-info-user hidden'
  const handleMouseMove = () => {
    setSelected(true)
  }
  const handleMouseLeave = () => {
    setSelected(false)
  }

  return (
    <Link to={`${ROUTES.INICIO}${pelicula.id}`}>
      <div
        className='movie-container-user'
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <img
          className='movie-photo-user'
          src={pelicula.foto}
          alt={pelicula.titulo}
        />
        <div className={style}>
          <p className='movie-year'>{pelicula.anho}</p>
          <p className='movie-title-user'>{pelicula.titulo}</p>
        </div>
      </div>
    </Link>
  )
}

// Componente genérico de los dos anteriores, renderiza uno u otro en función de si está en el perfil de usuario o no.
// pelicula: datos de la película
// isUser: es true cuando está en el perfil de usuario.
export function Pelicula ({ pelicula, isUser }) {
  return (
    isUser
      ? <PeliculaPerfil pelicula={pelicula} />
      : <PeliculaBuscador pelicula={pelicula} />
  )
}
