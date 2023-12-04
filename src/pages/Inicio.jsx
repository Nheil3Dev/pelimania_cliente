import { useContext, useEffect, useState } from 'react'
import { Header } from '../components/Header'
import { SesionContext } from '../context/sesion'
import Login from '../pages/Login'
import './Inicio.css'

export default function Inicio () {
  // Obtenemos el usuario del contexto.
  const { usuario } = useContext(SesionContext)
  // Estado para controlar la visibilidad de la página de login
  const [visibleLogin, setVisibleLogin] = useState(false)
  // Para controlar el estilo de la página
  const mainStyle = visibleLogin ? 'home-container blur-home' : 'home-container'

  useEffect(() => {
    // Manejador del evento onKeyDown
    const pressEsc = (evento) => {
    // Comprobamos que estamos pulsando la tecla ESC
      if (evento.code === 'Escape') {
      // Cerramos la ventana de login.
        setVisibleLogin(false)
      }
    }
    window.addEventListener('keydown', pressEsc)

    return () => {
      window.removeEventListener('keydown', pressEsc)
    }
  }, [visibleLogin])
  return (
    <>
      <Header setVisibleLogin={setVisibleLogin} />
      <main className={mainStyle}>
        <h1 className='home-title'>Bienvenid@ a <span className='home-title-color'>PELIMANIA</span></h1>
        <p className='home-text'>
          En PELIMANIA le tenemos fobia a las series, por eso somos una red social centrada única y exclusivamente en las
          películas.
          <br />
          Queremos que compartas todas tus opiniones de tus películas favoritas con nosotros.
          <br />
          Disfruta.
        </p>
        {!usuario &&
          <button className='home-button' onClick={() => setVisibleLogin(true)}>
            Registrarme
          </button>}
      </main>
      {visibleLogin && <Login setVisibleLogin={setVisibleLogin} visibleLogin={visibleLogin} />}
    </>
  )
}
