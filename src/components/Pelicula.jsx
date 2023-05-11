import { Link } from 'react-router-dom'
import { BotonSeguir } from './BotonSeguir'
import './Pelicula.css'

// Componente que se encarga de renderizar una película en el Buscador.
// pelicula: datos de la película.
export function PeliculaBuscador ({ pelicula }) {
  return (
    <>
      <article className='movie-container'>
        <p className='movie-year'>{pelicula.anho}</p>
        <h3 className='movie-title'>{pelicula.titulo}</h3>
        <Link to={`/Pelimania/${pelicula.id}`}>
          <img
            className='movie-photo'
            src={pelicula.foto}
            alt={pelicula.titulo}
          />
        </Link>
        <BotonSeguir pelicula={pelicula} />
      </article>
    </>
  )
}

// Componente que se encarga de renderizar una película en el perfil de Usuario.
// pelicula: datos de la película
export function PeliculaPerfil ({ pelicula }) {
  return (
    <Link to={`/Pelimania/${pelicula.id}`}>
      <img
        className='movie-photo'
        src={pelicula.foto}
        alt={pelicula.titulo}
      />
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
