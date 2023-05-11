import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { SesionContext } from '../context/sesion'
import './Comentario.css'
import { Estrellas } from './Estrellas'

// Componente encargado de renderizar un comentario individual
// datos: información del propio comentario.
// isUser: true cuando se pintan comentarios para el perfil usuario
// isAdmin: true cuando se pintan comentarios para el perfil administrador
// adminProps: actualizar estados del componente padre (ComentariosAdmin).
export function Comentario ({ datos, isUser, isAdmin, adminProps }) {
  // Obtenemos el usuario de la sesión
  const { usuario } = useContext(SesionContext)
  // Creamos un estado para controlar el efecto blur.
  const [blur, setBlur] = useState(datos.spoiler)
  // Controlamos el estilo del comentario (si tiene efecto blur o no)
  const styleComment = blur && !isUser && !isAdmin
    ? 'comment-container-footer blur'
    : 'comment-container-footer'
  // Manejador del estado del blur
  const handleBlur = () => {
    if (blur) setBlur(false)
  }
  // Calculamos la ruta cuando pinchemos sobre el nombre de usuario(perfil pelicula) o el nombre de la película(perfil usuario)
  const ruta = isUser // Comprobamos que estamos en el perfil de usuario.
    // la ruta será el perfil de la película
    ? `/Pelimania/${datos.idPelicula}`
    // Estamos en el perfil de la película y comprobamos si queremos visitar nuestro perfil o el de otro usuario.
    : (usuario === datos.usuario)
        // Nuestro perfil.
        ? '/Pelimania/perfil'
        // El perfil de otro usuario.
        : `/Pelimania/perfil/${datos.usuario}`

  return (
    <article className='comment-container'>
      <div className='comment-container-header'>
        <Estrellas estrellas={datos.estrellas} isComment />
        <div className='comment-container-header-user-container'>
          <Link to={ruta}>
            <h3 className='comment-container-header-user-name'>
              {isUser ? datos.titulo : datos.usuario}
            </h3>
          </Link>
          {isAdmin && <Link to={`/Pelimania/${datos.idPelicula}`}><h3 className='comment-container-header-user-name'>{datos.titulo}</h3></Link>}
        </div>
        <h5 className='comment-container-header-date'>
          {datos.fecha}
        </h5>
      </div>
      <div className={styleComment} onClick={handleBlur}>
        <p className='comment-container-footer-text'>
          {datos.comentario}
        </p>
        {isAdmin && <BotonBorrarComentario adminProps={adminProps} datos={datos} />}
      </div>
    </article>
  )
}

// Componente encargado de renderizar el botón de borrar comentario.
export function BotonBorrarComentario ({ adminProps, datos }) {
  // Destructuración de las adminProps
  const { setVisible, setComentarioBorrar, setBlurComentarios } = adminProps
  // Manejador del evento click
  const handleClick = () => {
    // Cambia el valor del estado visible a true (aparece pop up de confirmación)
    setVisible(true)
    // Actualizamos con los datos del comentario que queremos borrar.
    setComentarioBorrar(datos)
    // Cambiar el valor del estado blurComentarios a true (fondo con efecto blur)
    setBlurComentarios(true)
  }

  return (
    <button className='delete-button' onClick={handleClick}>Borrar</button>
  )
}
