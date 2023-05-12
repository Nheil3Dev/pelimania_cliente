import { useRef } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'

import Admin from './pages/Admin'
import Buscador from './pages/Buscador'
import Inicio from './pages/Inicio'
import PerfilPelicula from './pages/PerfilPelicula'
import PerfilUsuario from './pages/PerfilUsuario'

function App () {
  // Creamos una referencia, para que la última búsqueda realizada en el buscador permanezca, por defecto su valor será vacio.
  // Este valor se actualizará dentro del componente Buscador, lo creo aquí porque este es el componente principal.
  const ultimaBusqueda = useRef('')
  // const { sesion } = useContext(SesionContext)
  // const [registrado, setRegistrado] = useState(sesion)
  // Investigar esto
  // if (!registrado) {
  //   redirect('/')
  // }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/Pelimania/' element={<Inicio ultimaBusqueda={ultimaBusqueda} />} />
          <Route path='/Pelimania/admin' element={<Admin ultimaBusqueda={ultimaBusqueda} />} />
          <Route path='/Pelimania/buscador' element={<Buscador ultimaBusqueda={ultimaBusqueda} />} />
          <Route path='/Pelimania/perfil' element={<PerfilUsuario ultimaBusqueda={ultimaBusqueda} />} />
          <Route path='/Pelimania/perfil/:usuario' element={<PerfilUsuario amigo ultimaBusqueda={ultimaBusqueda} />} />
          <Route path='/Pelimania/:id' element={<PerfilPelicula ultimaBusqueda={ultimaBusqueda} />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
