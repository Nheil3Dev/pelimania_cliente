import './InfoExtraPelicula.css'

// Componente que se encarga de renderizar la información extra en el perfil de la película.
// pelicula: información de la película
export function InfoExtraPelicula ({ pelicula }) {
  return (
    <div className='extra-content-container'>
      <p>{pelicula.resumen}</p>
      <div className='extra-content'>
        <div className='extra-content-headers'>
          <p>Director</p>
          <p>Actores</p>
          <p>Guión</p>
          <p>Premios</p>
        </div>
        <div className='extra-content-info'>
          <p>{pelicula.director}</p>
          <p>{pelicula.actores}</p>
          <p>{pelicula.escritores}</p>
          <p>{pelicula.premios}</p>
        </div>
      </div>

    </div>
  )
}
