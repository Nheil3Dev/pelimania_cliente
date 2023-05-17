import { createContext, useRef, useState } from 'react'

export const SearchContext = createContext()

export function SearchProvider ({ children }) {
  const ultimaBusqueda = useRef('')
  const [actualizar, setActualizar] = useState(false)
  return (
    <SearchContext.Provider value={{ ultimaBusqueda, actualizar, setActualizar }}>
      {children}
    </SearchContext.Provider>
  )
}
