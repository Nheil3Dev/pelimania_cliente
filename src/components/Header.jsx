import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { SesionContext } from '../context/sesion'
import { ROUTES } from '../utils/const'
import { DropMenuHeader } from './DropMenuHeader'
import { FormularioBuscador } from './FormularioBuscador'
import './Header.css'
import { SearchIcon } from './SearchIcon'

// Componente que renderiza el Header
// setVisibleLogin:
export function Header ({ setVisibleLogin }) {
  // Obtenemos los datos necesarios del contexto.
  const { usuario, setUsuario, setSesion, setAdmin } = useContext(SesionContext)
  // Función para redireccionar.
  const navigate = useNavigate()
  // Estilo del Link 'Buscador'
  const styleBuscador = window.location.pathname.toString().includes('buscador') ? 'header-links activo' : 'header-links'
  // Estilo del Link 'Mi Perfil'
  const perfil = window.location.pathname.toString()
  const stylePerfil = perfil.includes('perfil') ? (perfil.includes('perfil/') ? 'header-links' : 'header-links activo') : 'header-links'
  // Estilo del Link 'Admin'
  const styleAdmin = window.location.pathname.toString().includes('admin') ? 'header-links activo' : 'header-links'

  const styleButton = usuario ? 'sesion-on' : 'sesion-header-button'

  const handleClick = () => {
    if (usuario) {
      setUsuario('')
      setSesion(false)
      setAdmin(false)
      window.localStorage.removeItem('usuario')
      window.localStorage.removeItem('sesion')
      window.localStorage.removeItem('admin')
      navigate(ROUTES.INICIO)
    } else {
      setVisibleLogin(true)
    }
  }

  return (
    <header>
      <Link to={ROUTES.INICIO}>
        <div className='logo-header-fondo'>
          <h2 className='logo-header'>PELIMANIA</h2>
        </div>
      </Link>
      {usuario !== 'admin' && usuario &&
        <nav className='links-header'>
          <Link to={ROUTES.BUSCADOR} className={styleBuscador}>BUSCADOR</Link>
          <Link to={ROUTES.PERFIL} className={stylePerfil}>MI PERFIL</Link>
        </nav>}
      {usuario === 'admin' &&
        <nav className='links-header'>
          <Link to={ROUTES.ADMIN} className={styleAdmin}>ADMIN</Link>
        </nav>}
      <div className='sesion-header'>
        {usuario &&
          <>
            <FormularioBuscador />
            <span className='sesion-header-seach-icon'><SearchIcon /></span>
          </>}
        <button className={styleButton} onClick={handleClick}>
          {usuario ? 'Cerrar sesión' : 'Iniciar sesión'}
        </button>
        {usuario && <DropMenuHeader props={{ setUsuario, setSesion, setAdmin, setVisibleLogin, usuario }} />}
      </div>
    </header>
  )
}
