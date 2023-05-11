import { useState } from 'react'

export function useComentariosAdmin () {
  // Estado para controlar que comentario hay que borrar
  const [comentarioBorrar, setComentarioBorrar] = useState([])
  // Estado para controlar que se ha borrado el comentario
  const [borrado, setBorrado] = useState(false)
  // Estado para controlar la visibilidad del pop up
  const [visible, setVisible] = useState(false)
  // Estado para controlar el estilo del background de los comentarios
  const [blur, setBlur] = useState(false)

  // Devuelve los datos necesarios para el componente que utilizará el hook
  return { borrado, setBorrado, visible, setVisible, blur, setBlur, comentarioBorrar, setComentarioBorrar }
}
