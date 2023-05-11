import { createContext, useState } from 'react'
// Creamos el contexto
export const SesionContext = createContext()
// Creamos el proveedor del contexto
export function SesionProvider ({ children }) {
  // comprobamos que existe un usuario en localstorage y lo guardamos en una variable
  const usuarioZero = window.localStorage.getItem('usuario') || ''
  // comprobamos que existe una sesion activa en localstorage y la guardamos en una variable
  const sesionZero = window.localStorage.getItem('sesion') || false
  // comprobamos que existe una sesion activa con usuario administrador y la guardamos en una variable
  const adminZero = window.localStorage.getItem('admin') || false
  // estado para manejar el usuario
  const [usuario, setUsuario] = useState(usuarioZero)
  // estado para manejar la sesion
  const [sesion, setSesion] = useState(sesionZero)
  // estado para manejar la sesion de administración.
  const [admin, setAdmin] = useState(adminZero)

  return (
    <SesionContext.Provider value={{ usuario, setUsuario, sesion, setSesion, admin, setAdmin }}>
      {children}
    </SesionContext.Provider>
  )
}
