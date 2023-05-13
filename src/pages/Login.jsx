import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { SesionContext } from '../context/sesion'
import { useLogin } from '../hooks/useLogin'
import './Login.css'

// Componente que se encarga de renderizar la página de login
// pressEsc: Manejador de evento onKeyDown
export default function Login ({ pressEsc }) {
  // Extraemos los datos necesarios del contexto
  const { setUsuario, sesion, setSesion, admin, setAdmin } = useContext(SesionContext)
  // Extraemos los datos necesarios del custom hook useLogin
  const { nombreUsuario, setNombreUsuario, contrasena, setContrasena, error, anadido, verificarUsuario, setError } = useLogin()

  // Controla el valor de la entrada usuario cada vez que cambia su valor
  const handleChangeUser = (evento) => {
    // Extrae el valor del input
    const nuevoNombre = evento.target.value
    // Actualiza el valor de la variable sin espacios en blanco
    setNombreUsuario(nuevoNombre.trim())
    setError('')
  }

  // Controla el valor de la entrada contraseña cada vez que cambia su valor
  const handleChangePassword = (evento) => {
    // Extrae el valor del input
    const nuevaContrasena = evento.target.value
    // Actualiza el valor de la variable sin espacios en blanco
    setContrasena(nuevaContrasena.trim())
    setError('')
  }

  const pressEspace = (evento) => {
    if (evento.code === 'Space') {
      setError('Espacio no permitido')
    }
  }

  // Controla la acción de los inputs de tipo submit
  const handleSubmit = async (evento) => {
    // Guardamos en una variable la acción a realizar
    const accion = evento.target.value
    // Eliminamos el comportamiento por defecto del evento lanzado
    evento.preventDefault()
    // Controlamos los datos antes de mandarlos al servidor
    if (nombreUsuario.length < 4) {
      setError('Usuario mínimo de 4 caracteres')
      return
    } else if (nombreUsuario.length > 20) {
      setError('Usuario máximo de 20 caracteres')
      return
    } else if (contrasena.length < 4) {
      setError('Contraseña mínima de 4 caracteres')
      return
    } else if (contrasena.length > 20) {
      setError('Contraseña máxima de 20 caracteres')
      return
    }

    // Comprobamos que el usuario está registrado
    if (await verificarUsuario(nombreUsuario, contrasena, accion)) {
      // Guardamos el valor de usuario en localStorage
      window.localStorage.setItem('usuario', nombreUsuario)
      // Comprobamos que el usuario sea el administrador
      if (nombreUsuario === 'admin') { // Si lo es
        // Actualizamos el estado que controla el administrador a verdadero
        setAdmin(true)
      } // No lo es
      // Actualizamos el estado que controla el usuario con el nuevo valor
      setUsuario(nombreUsuario)
      // Actualizamos el estado que controla la sesion a verdadero
      setSesion(true)
    }
  }
  // Lo que renderiza esta página
  return (
    <>
      {(admin && <Navigate to='/Pelimania/admin' />) || (sesion && <Navigate to='/Pelimania/perfil' />)}
      <main className='entry-form-back' onKeyDown={pressEsc}>
        <section className='entry-form-container'>
          <h1 className='entry-form-title'>Login</h1>
          <form
            className='entry-form'
            onSubmit={handleSubmit}
            action='/perfil'
          >
            <input
              type='text'
              placeholder='Usuario'
              name='user'
              value={nombreUsuario}
              onChange={handleChangeUser}
              onKeyDown={pressEspace}
              className='entry-form-data'
            />
            <input
              type='password'
              placeholder='Contraseña'
              name='password'
              value={contrasena}
              onChange={handleChangePassword}
              onKeyDown={pressEspace}
              className='entry-form-data'
            />
            {
          error.length > 0 &&
          (
            <div className='entry-form-error'>
              {error}
            </div>
          )
        }
            {
          anadido &&
          (
            <div className='entry-form-anadido'>
              Usuario creado con éxito
            </div>
          )
        }
            <div className='entry-form-buttons'>
              <input
                type='submit'
                value='Iniciar sesión'
                className='entry-form-button'
                onClick={handleSubmit}
              />
              <input
                type='submit'
                value='Registrarme'
                className='entry-form-button'
                onClick={handleSubmit}
              />
            </div>
          </form>
        </section>
      </main>
    </>
  )
}
