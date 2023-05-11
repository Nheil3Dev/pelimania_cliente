import { useComentarios } from '../hooks/useComentarios'
import { AnadirComentario } from './AnadirComentario'
import { Comentario } from './Comentario'
import './Comentarios.css'

// Componente que se encarga de renderizar los todos los comentarios del perfil de la película.
// siguiendo: para controlar que se muestra el componente de añadir comentarios
export function Comentarios ({ siguiendo }) {
  // Obtenemos los datos necesarios del custom hook useComentarios.
  const { comentarios, actualizar, setActualizar } = useComentarios()
  return (
    <>
      {siguiendo && <AnadirComentario setActualizar={setActualizar} />}
      <ul className='comments-container'>
        {
        comentarios.length > 0
          ? (
              comentarios.map(comentario => (
                <li
                  key={comentario.idPelicula.concat(comentario.fecha)}
                  className='comments-container-single'
                >
                  <Comentario datos={comentario} actualizar={actualizar} />
                </li>
              )
              ))
          : <SinComentarios />
      }
      </ul>
    </>
  )
}

// Componente que se encarga de renderizar un mensaje cuando no hay comentarios.
export function SinComentarios () {
  return (
    <p style={{ color: 'rgb(255, 127, 170)' }}>No hay comentarios</p>
  )
}
