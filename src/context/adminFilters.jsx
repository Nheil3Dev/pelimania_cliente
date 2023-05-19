import { createContext, useState } from 'react'

export const AdminFiltersContext = createContext()

export function AdminFiltersProvider ({ children }) {
  // Estado para controlar el filtro de los usuarios
  const [usuarioFiltro, setUsuarioFiltro] = useState('Todos')
  // Estado para controlar el filtro de las películas
  const [peliculaFiltro, setPeliculaFiltro] = useState('Todas')
  // Estado para controlar el filtro de las estrellas
  const [estrellasFiltro, setEstrellasFiltro] = useState('Todas')
  return (
    <AdminFiltersContext.Provider value={{ usuarioFiltro, setUsuarioFiltro, peliculaFiltro, setPeliculaFiltro, estrellasFiltro, setEstrellasFiltro }}>
      {children}
    </AdminFiltersContext.Provider>
  )
}
