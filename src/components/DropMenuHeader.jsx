import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ROUTES } from '../utils/const'
import { BarsIcon } from './BarsIcon'
import './DropMenuHeader.css'
import { XIcon } from './XIcon'

export function DropMenuHeader ({ props }) {
  const { setUsuario, setSesion, setAdmin, setVisibleLogin, usuario } = props
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false)
  const styleDropMenu = visible ? 'header-drop-menu' : 'header-drop-menu invisible-drop-menu'
  const handleVisible = () => {
    setVisible(!visible)
  }
  return (
    <>
      <span className='header-bars' onClick={handleVisible}>
        {!visible
          ? <BarsIcon />
          : <XIcon />}
      </span>
      <input type='checkbox' id='bars' />
      <div className={styleDropMenu}>
        <nav className='header-drop-menu-links'>
          {usuario !== 'admin' && usuario &&
            <>
              <Link to={ROUTES.BUSCADOR} className='header-drop-menu-link'>BUSCADOR</Link>
              <Link to={ROUTES.PERFIL} className='header-drop-menu-link'>MI PERFIL</Link>
            </>}
          {usuario === 'admin' &&
            <Link to={ROUTES.ADMIN} className='header-drop-menu-link'>ADMIN</Link>}
          <a
            href='#'
            onClick={() => {
              if (usuario) {
                setUsuario('')
                setSesion(false)
                setAdmin(false)
                window.localStorage.clear()
                navigate(ROUTES.INICIO)
              } else {
                setVisibleLogin(true)
              }
            }}
            className='header-drop-menu-link'
          >{usuario ? 'Cerrar sesión' : 'Iniciar sesión'}
          </a>
        </nav>
      </div>
    </>
  )
}
