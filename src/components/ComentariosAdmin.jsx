import { useComentariosAdmin } from '../hooks/useComentariosAdmin'
import { useFiltroAdmin } from '../hooks/useFiltroAdmin'
import { Comentario } from './Comentario'
import { SinComentarios } from './Comentarios'
import './ComentariosAdmin.css'
import { FiltroComentarios } from './FiltroComentarios'
import { PopUp } from './PopUp'

// Componente que se encarga de renderizar los comentarios del perfil de administración
// usuarios: Lo utilizo para el filtro (para sacar la lista de usuarios)
export function ComentariosAdmin ({ usuarios }) {
  // Obtenemos los datos necesarios del custom hook useComentariosAdmin.
  const { comentarios, visible, setVisible, blur, setBlur, comentarioBorrar, setComentarioBorrar, borrarComentario } = useComentariosAdmin()
  // Obtenemos los datos necesarios del custom hook useFiltroAdmin.
  const { peliculas, comentariosFiltro } = useFiltroAdmin({ comentarios })
  // Variable que controla el estilo del background de los comentarios.
  const styleComments = blur ? 'user-comments blur' : 'user-comments'

  return (
    <div>
      <FiltroComentarios props={{ peliculas, usuarios }} />
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
