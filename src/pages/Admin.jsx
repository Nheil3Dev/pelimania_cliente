import { useEffect, useState } from 'react'
import { ComentariosAdmin } from '../components/ComentariosAdmin'
import { Enlaces } from '../components/Enlaces'
import { Header } from '../components/Header'
import { Usuarios } from '../components/Usuarios'
import { URLS } from '../utils/const'

// Componente que se encarga de renderizar la página de administración
export default function Admin () {
  // Estado para controlar si el pop up es visible o no.
  const [visible, setVisible] = useState(true)
  // Estado para controlar la lista de usuarios.
  const [usuarios, setUsuarios] = useState([])
  // Estado para controlar rerender de la lista de usuarios cuando borramos un usuario.
  const [borrado, setBorrado] = useState(false)
  // Efecto que se llamará con la primera renderización del componente y cada vez que cambie el estado borrado.
  useEffect(() => {
    // petición asíncrona al servidor
    fetch(URLS.USUARIOS_ADMIN)
      // convertimos la respuesta a formato json
      .then(usuarios => usuarios.json())
      // actualizamos la lista de usuarios
      .then(usuarios => {
        // Comprobamos que hay usuarios
        if (usuarios.length > 0) {
          setUsuarios(usuarios)
        // No hay usuarios
        } else {
          setUsuarios([])
        }
      })
  }, [borrado])

  return (
    <>
      <Header />
      <main>
        <h1 className='title'>Administrador</h1>
        <Enlaces setVisible={setVisible} visible={visible} opcion1='Usuarios' opcion2='Comentarios' />
        {visible && <Usuarios usuarios={usuarios} setBorrado={setBorrado} />}
        {!visible && <ComentariosAdmin usuarios={usuarios} />}
      </main>
    </>
  )
}
