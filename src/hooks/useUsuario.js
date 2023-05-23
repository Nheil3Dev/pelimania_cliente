import { useContext, useEffect, useRef, useState } from 'react'
import { SesionContext } from '../context/sesion'
import { URLS } from '../utils/const'

export function useUsuario ({ amigo }) {
  // Obtenemos los datos necesarios del contexto.
  const { usuario, setUsuario, sesion } = useContext(SesionContext)
  // Estado para controlar las películas que sigue el usuario
  const [peliculasUsuario, setPeliculasUsuario] = useState([])
  // Estado para controlar los comentarios realizados por el usuario
  const [comentarios, setComentarios] = useState([])
  const { current: peliculasRef } = useRef(peliculasUsuario) // no hace nada
  // Saco el perfil al que se quiere entrar desde la url
  const path = window.location.pathname
  const usuarioAmigo = '' || path.match(/perfil\/\w*/)?.toString().split('/').filter(palabra => palabra !== 'perfil').toString()
  // Diferencio si es mi perfil o un perfil distinto
  const usuarioPerfil = amigo ? usuarioAmigo : usuario
  // Para comprobar que el perfil de usuario al que se quiere acceder es un usuario registrado
  const [registrado, setRegistrado] = useState(true)
  // Efecto cada vez que cambia el usuario y al montar el componente.
  useEffect(() => {
    // Comprueba que el usuario que queremos visitar existe (esta registrado)
    if (amigo) {
      fetch(`${URLS.USUARIO_LOGIN}/${usuarioPerfil}/no-contrasena`)
        .then(respuesta => respuesta.json())
        .then(respuesta => {
          if (!respuesta.registrado) {
            setRegistrado(false)
          }
        })
    }
    if (!registrado) {
      return
    }
    // Petición asíncrona al servidor para obtener las películas
    fetch(`${URLS.PELICULAS_SELECT}/${usuarioPerfil}`)
      // Convertimos la respuesta a formato json
      .then(peliculas => peliculas.json())
      // Actualizamos las peliculas del usuario
      .then(peliculas => {
        setPeliculasUsuario(peliculas)
      })

    // Petición asíncrona al servidor para obtener los comentarios
    fetch(`${URLS.COMENTARIOS_USER}/${usuarioPerfil}`)
      // Convertimos la respuesta a formato json
      .then(comentarios => comentarios.json())
      // Actualizamos los comentarios del usuario
      .then(comentarios => setComentarios(comentarios))
  }, [peliculasRef, usuarioPerfil])

  // Devolvemos los datos necesarios para el componente que utiliza el hook
  return { peliculasUsuario, setPeliculasUsuario, comentarios, usuario: usuarioPerfil, setUsuario, sesion, registrado }
}
