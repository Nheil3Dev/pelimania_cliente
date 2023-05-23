import { useContext } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { SearchProvider } from './context/search'
import { SesionContext } from './context/sesion'
import { ROUTES } from './utils/const'

import RequireAuth from './components/RequireAuth'
import Admin from './pages/Admin'
import Buscador from './pages/Buscador'
import Inicio from './pages/Inicio'
import Page404 from './pages/Page404'
import PerfilPelicula from './pages/PerfilPelicula'
import PerfilUsuario from './pages/PerfilUsuario'

function App () {
  const { sesion, admin } = useContext(SesionContext)

  return (
    <SearchProvider>
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.INICIO} element={<Inicio />} />
          <Route path={ROUTES.ADMIN} element={<RequireAuth sesion={admin}><Admin /></RequireAuth>} />
          <Route path={ROUTES.BUSCADOR} element={<RequireAuth sesion={sesion}><Buscador /></RequireAuth>} />
          <Route path={ROUTES.PERFIL} element={<RequireAuth sesion={sesion}><PerfilUsuario /></RequireAuth>} />
          <Route path={ROUTES.USUARIO} element={<RequireAuth sesion={sesion}><PerfilUsuario amigo /></RequireAuth>} />
          <Route path={ROUTES.PELICULA} element={<RequireAuth sesion={sesion}><PerfilPelicula /></RequireAuth>} />
          <Route path={ROUTES.PAGE404} element={<Page404 />} />
        </Routes>
      </BrowserRouter>
    </SearchProvider>
  )
}

export default App
