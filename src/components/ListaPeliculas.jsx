import { useState } from 'react'
import './ListaPeliculas.css'
import { Pelicula } from './Pelicula'

// Componente encargado de renderizar un listado de películas.
// peliculas: peliculas de la lista
// isUser: es verdadero cuando el componente se usa en el perfil de usuario.
export function ListaPeliculas ({ peliculas, isUser }) {
  // Estado que nos permite controlar si queremos ampliar la lista de peliculas visibles.
  const [ampliar, setAmpliar] = useState(false)
  // Estado que nos permite controlar el texto del botón.
  const [boton, setBoton] = useState('Mostrar todas')
  // calculo el ancho de la ventana disponible para mostrar más o menos peliculas
  const anchoPantalla = ((window.innerWidth * 80 / 100) - 40) / 220
  // modifico el array de peliculas que se mostrarán (sólo en el perfil de usuario)
  const peliculasFiltro = (ampliar || !isUser) ? peliculas : peliculas.slice(0, anchoPantalla)
  // Manejador del evento onclick:
  const handleClick = () => {
    // Cambiamos el valor del estado ampliar.
    setAmpliar(!ampliar)
    // Comprobamos el texto del botón
    if (boton === 'Mostrar todas') {
      // Actualizamos el texto del botón
      setBoton('Mostrar menos')
    } else {
      // Actualizamos el texto del botón
      setBoton('Mostrar todas')
    }
  }
  return (
    <>
      <div className='movies-container'>
        <ul className='movies-container-list'>
          {
            peliculasFiltro.map(pelicula => (
              <li key={pelicula.id}>
                <Pelicula pelicula={pelicula} isUser={isUser} />
              </li>
            ))
          }
        </ul>
      </div>
      {
        peliculas.length > anchoPantalla &&
        isUser &&
          <button className='more-button' onClick={handleClick}>{boton}</button>
      }
    </>

  )
}
