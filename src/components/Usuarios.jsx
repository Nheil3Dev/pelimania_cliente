import { Link } from 'react-router-dom'
import { useUsuarios } from '../hooks/useUsuarios'
import { ROUTES } from '../utils/const'
import { PopUp } from './PopUp'
import './Usuarios.css'

// Componente que se encarga de renderizar una lista con todos los usuarios en el perfil de administración
// usuarios: listado de usuarios
// setBorrado: estado que nos permite rerender de la lista cuando borramos un usuario.
export function Usuarios ({ usuarios, setBorrado }) {
  // Obtenemos los datos necesarios del custom hook useUsuarios.
  const { setVisible, setBlur, setUsuarioBorrar, usuarioBorrar, borrarUsuario, visible, blur } = useUsuarios({ setBorrado })
  // Controlamos el estilo del background de nuestra la lista de usuarios
  const style = blur ? 'users-container blur' : 'users-container'
  return (
    <>
      <ul className={style}>
        {usuarios.length > 0
          ? usuarios.map(usuario => <li key={usuario.usuario}><Usuario props={{ usuario, setVisible, setUsuarioBorrar, setBlur }} /></li>)
          : <p style={{ color: '#ff7faa' }}>No hay usuarios registrados</p>}
      </ul>
      {visible && <PopUp props={{ elemento: usuarioBorrar, borrarElemento: borrarUsuario, setVisible, setBlur }} />}
    </>

  )
}

// Componente que se encarga de renderizar un usuario de la lista
// usuario: datos del usuario
// setVisible: nos permite modificar el estado visible (pop up)
// setUsuarioBorrar: nos permite controlar el usuario que queremos eliminar de la lista
// setBlur: nos permite modificar el background de la lista de usuarios (blur cuando pop up está visible)
export function Usuario ({ props }) {
  // Desestructuramos las props.
  const { usuario, setVisible, setUsuarioBorrar, setBlur } = props
  // Manejador del evento onClick del botón
  const handleClick = () => {
    // Hacemos visible el pop up de confirmación.
    setVisible(true)
    // Seleccionamos el usuario a borrar.
    setUsuarioBorrar(usuario.usuario)
    // Efecto blur en la lista de usuarios.
    setBlur(true)
  }
  return (
    <section className='user-container'>
      <Link to={`${ROUTES.INICIO}perfil/${usuario.usuario}`}><h3 className='user-name'>{usuario.usuario}</h3></Link>
      <button
        className='user-button delete-button'
        onClick={handleClick}
      >
        Borrar
      </button>
    </section>
  )
}
