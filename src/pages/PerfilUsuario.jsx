import { Comentario } from '../components/Comentario'
import { Header } from '../components/Header'
import { ListaPeliculas } from '../components/ListaPeliculas'
import { useUsuario } from '../hooks/useUsuario'
import Page404 from './Page404'
import './PerfilUsuario.css'

// Componente que se encarga de renderizar la página perfil de usuario
// amigo: será true cuando el perfil a renderizar sea diferente al del usuario (de otro usuario)
export default function PerfilUsuario ({ amigo }) {
  // Obtenemos los datos necesarios del custom hook useUsuario.
  const { peliculasUsuario, comentarios, usuario, registrado } = useUsuario({ amigo })
  // Si el usuario que estamos intentando visitar no existe
  if (!registrado) {
    return (<Page404 />)
  }

  return (
    <>
      <Header />
      <main className='main-user'>
        <h1 className='user-title'>{amigo ? 'Perfil de ' : 'Hola '}<span className='user-title-color'>{usuario}</span></h1>
        <h2 className='user-sec-title'>Siguiendo:</h2>
        {peliculasUsuario.length > 0
          ? <ListaPeliculas peliculas={peliculasUsuario} isUser />
          : <p style={{ color: 'rgb(255, 127, 170)' }}>Sin películas</p>}
        <h2 className='user-sec-title'>Ultimos comentarios:</h2>
        {comentarios.length > 0
          ? (
            <ul className='user-comments'>
              {comentarios.slice(0, 3).map(comentario => (
                <li key={comentario.idPelicula.concat(comentario.fecha)}>
                  <Comentario datos={comentario} isUser />
                </li>)
              )}
            </ul>
            )
          : <p style={{ color: 'rgb(255, 127, 170)' }}>Sin comentarios</p>}
      </main>
    </>
  )
}
