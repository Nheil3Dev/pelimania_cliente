import { createContext, useRef } from 'react'

export const SearchContext = createContext()

export function SearchProvider ({ children }) {
  const ultimaBusqueda = useRef('')
  return (
    <SearchContext.Provider value={ultimaBusqueda}>
      {children}
    </SearchContext.Provider>
  )
}
