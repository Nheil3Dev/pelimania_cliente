import { useComentariosAdmin } from '../hooks/useComentariosAdmin'
import { useFiltroAdmin } from '../hooks/useFiltroAdmin'
import { URLS } from '../utils/const'
import { Comentario } from './Comentario'
import { SinComentarios } from './Comentarios'
import './ComentariosAdmin.css'
import { FiltroComentarios } from './FiltroComentarios'
import { PopUp } from './PopUp'

// Componente que se encarga de renderizar los comentarios del perfil de administración
// usuarios: Lo utilizo para el filtro (para sacar la lista de usuarios)
export function ComentariosAdmin ({ usuarios }) {
  // Obtenemos los datos necesarios del custom hook useComentariosAdmin.
  const { comentarios, visible, setVisible, blur, setBlur, comentarioBorrar, setComentarioBorrar, setBorrado } = useComentariosAdmin()
  // Obtenemos los datos necesarios del custom hook useFiltroAdmin.
  const { setPeliculaFiltro, setUsuarioFiltro, setEstrellasFiltro, peliculas, comentariosFiltro } = useFiltroAdmin({ comentarios })
  // Variable que controla el estilo del background de los comentarios.
  const styleComments = blur ? 'user-comments blur' : 'user-comments'
  // Función para borrar comentarios
  const borrarComentario = (comment) => {
    // Petición asíncrona al servidor
    fetch(URLS.COMENTARIO_BORRAR, {
      method: 'DELETE',
      body: JSON.stringify(comment),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      // Convertimos la resuesta a formato json
      .then(respuesta => respuesta.json())
      // Comprobamos que se ha borrado y actualizamos el estado (para rerender de la lista de comentarios)
      .then(respuesta => {
        if (respuesta.borrado) {
          setBorrado(estadoAnterior => !estadoAnterior)
        }
      })
  }
  return (
    <div>
      <FiltroComentarios props={{ setPeliculaFiltro, setUsuarioFiltro, setEstrellasFiltro, peliculas, usuarios }} />
      <ul className={styleComments}>
        {comentariosFiltro.length > 0
          ? (comentariosFiltro.map(comentario => (
            <li key={(comentario.usuario).concat(comentario.fecha)}>
              <Comentario datos={comentario} adminProps={{ isAdmin: true, setVisible, setComentarioBorrar, setBlurComentarios: setBlur }} isAdmin />
            </li>
            )))
          : <SinComentarios />}
      </ul>
      {visible && <PopUp props={{ elemento: comentarioBorrar, borrarElemento: borrarComentario, setBlur, setVisible }} />}
    </div>
  )
}
