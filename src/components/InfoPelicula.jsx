import { BotonSeguir } from './BotonSeguir'
import './InfoPelicula.css'

// Componente que se encarga de renderizar la información principal de la película en el perfil de la pelíicula
// pelicula: información de la película.
// setRefresh: para controlar si podemos o no comentar
export function InfoPelicula ({ pelicula, setRefresh }) {
  // Estilo de la nota, para diferenciar si tiene una nota menor a cinco o mayor a cinco.
  const styleRating = Number(pelicula.nota) < 5 ? 'info-content-data-rating bad' : 'info-content-data-rating'
  return (
    <section>
      <div className='info'>
        <h2 className='info-title'>{pelicula.titulo}</h2>
        <div className='info-info'>
          <div className='info-content'>
            <img
              src={pelicula.foto}
              alt={pelicula.titulo}
              className='info-content-photo'
            />
            <div className='info-content-data'>
              <div className='info-content-data-headers'>
                <p>Nota</p>
                <p>Estreno</p>
                <p>Duración</p>
                <p>Género</p>
              </div>
              <div className='info-content-data-info'>
                <p className={styleRating}>{pelicula.nota}<small>/10</small></p>
                <p>{pelicula.lanzamiento}</p>
                <p>{pelicula.duracion}</p>
                <p>{pelicula.generos}</p>
              </div>
            </div>
          </div>
          <BotonSeguir pelicula={pelicula} setRefresh={setRefresh} isPerfilPelicula />
        </div>
      </div>
    </section>

  )
}
