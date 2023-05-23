import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { SearchProvider } from './context/search'
import { ROUTES } from './utils/const'

import Admin from './pages/Admin'
import Buscador from './pages/Buscador'
import Inicio from './pages/Inicio'
import Page404 from './pages/Page404'
import PerfilPelicula from './pages/PerfilPelicula'
import PerfilUsuario from './pages/PerfilUsuario'

function App () {
  // Creamos una referencia, para que la última búsqueda realizada en el buscador permanezca, por defecto su valor será vacio.
  // Este valor se actualizará dentro del componente Buscador, lo creo aquí porque este es el componente principal.
  // const ultimaBusqueda = useRef('')
  // const { sesion } = useContext(SesionContext)
  // const [registrado, setRegistrado] = useState(sesion)
  // Investigar esto
  // if (!registrado) {
  //   redirect('/')
  // }

  return (
    <SearchProvider>
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.INICIO} element={<Inicio />} />
          <Route path={ROUTES.ADMIN} element={<Admin />} />
          <Route path={ROUTES.BUSCADOR} element={<Buscador />} />
          <Route path={ROUTES.PERFIL} element={<PerfilUsuario />} />
          <Route path={ROUTES.USUARIO} element={<PerfilUsuario amigo />} />
          <Route path={ROUTES.PELICULA} element={<PerfilPelicula />} />
          <Route path={ROUTES.PAGE404} element={<Page404 />} />
        </Routes>
      </BrowserRouter>
    </SearchProvider>
  )
}

export default App
