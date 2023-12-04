import confetti from 'canvas-confetti'
import { useEffect, useRef, useState } from 'react'
import { URLS } from '../utils/const'

export function useLogin (setVisibleLogin, visibleLogin) {
  // Estado para controlar el nombre de usuario
  const [nombreUsuario, setNombreUsuario] = useState('usuario_prueba')
  // Estado para controlar la contraseña
  const [contrasena, setContrasena] = useState('1234')
  // Estado para controlar los errores
  const [error, setError] = useState('')
  // Estado para controlar cuando se crea un nuevo usuario
  const [anadido, setAnadido] = useState(false)

  const loginRef = useRef(null)

  useEffect(() => {
    if (!loginRef.current) return
    const handleClickOutside = (e) => {
      if (visibleLogin && !loginRef.current?.contains(e.target)) {
        setVisibleLogin(false)
      }
    }

    window.addEventListener('mousedown', handleClickOutside, { capture: true })

    return () => {
      window.removeEventListener('mousedown', handleClickOutside, { capture: true })
    }
  }, [visibleLogin])

  // Función asíncrona que comprueba que el usuario está registrado
  const verificarUsuario = async (usuario, contrasena, accion) => {
    // Petición asíncrona al servidor
    const respuesta = await fetch(`${URLS.USUARIO_LOGIN}/${usuario}/${contrasena}`)
    // Convertimos la respuesta a formato json
    const respuestaCorrecta = await respuesta.json()
    // Si hemos pulsado el botón Registrarme y el usuario ya está en la base de datos
    if (respuestaCorrecta.registrado && accion === 'Registrarme') {
      // Actualizamos el error
      setError('El usuario ya existe')
    // El usuario está registrado y hemos pulsado el botón Iniciar sesión
    } else if (respuestaCorrecta.acceso) {
      // Ponemos el error a texto vacío, por si venimos de una situación de error.
      setError('')
      // Si anteriormente hemos añadido un usuario lo ponemos en false.
      setAnadido(false)
      return true
      // El usuario no está registrado y hemos pulsado en Registrarme.
    } else if (!respuestaCorrecta.registrado && accion === 'Registrarme') {
      // Añadimos el usuario a la base de datos y lo comprobamos
      if (anadirUsuario({ usuario, contrasena })) {
        // Si anteriormente teníamos error
        setError('')
        // Nos mostrará un mensaje de que el usuario se ha creado correctamente.
        setAnadido(true)
        // Efecto visual para confirmar que hemos creado un usuario
        confetti()
      }
      // Nombre de usuario incorrecto
    } else if (!respuestaCorrecta.acceso && !respuestaCorrecta.registrado) {
      // Actualizamos el error
      setError(respuestaCorrecta.error)
      // Contraseña incorrecta
    } else if (respuestaCorrecta.registrado && !respuestaCorrecta.acceso) {
      // Actualizamos el error
      setError(respuestaCorrecta.error)
    }
  }
  // Función asíncrona para añadir usuarios a la base de datos
  const anadirUsuario = async ({ usuario, contrasena }) => {
    // Petición asíncrona al servidor
    const respuesta = await fetch(URLS.USUARIO_REGISTRO, {
      method: 'POST',
      body: JSON.stringify({ usuario, contrasena }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    // Convertimos la respuesta a formato json
    const respuestaCorrecta = await respuesta.json()
    // Comprobamos que se ha añadido
    if (respuestaCorrecta.anadido) {
      return true
    }
    return false
  }

  // Devolvemos los datos necesarios para el componente que utiliza el hook
  return { nombreUsuario, setNombreUsuario, contrasena, setContrasena, error, anadido, verificarUsuario, setError, setAnadido, loginRef }
}
