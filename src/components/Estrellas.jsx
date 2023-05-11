import { useEffect, useState } from 'react'
import './Estrellas.css'

// Componente encargado de renderizar una estrella
// style: clase del elemento que determina su estilo (coloreada o no coloreada)
// index: indica la posición de la estrella (0-4)
export function EstrellaComentario ({ style, index }) {
  return (
    <span
      id='1'
      style={{ cursor: 'initial', fontSize: '8px' }}
      className={style[index]}
    >'
    </span>
  )
}

// Componente encargado de renderizar las estrellas de los comentarios realizados.
// firstStyle: array de cinco posiciones, cada una contiene la clase de esa estrella
export function EstrellasComentario ({ firstStyle }) {
  return (
    <div className='comment-form-footer-stars'>
      <EstrellaComentario style={firstStyle} index={0} />
      <EstrellaComentario style={firstStyle} index={1} />
      <EstrellaComentario style={firstStyle} index={2} />
      <EstrellaComentario style={firstStyle} index={3} />
      <EstrellaComentario style={firstStyle} index={4} />
    </div>
  )
}

// Componente encargado de renderizar las estrellas en la sección de añadir comentarios.
// setEstrellas: permite cambiar el número de estrellas seleccionadas
// estrellas: el número de estrellas seleccionadas
export function EstrellasAnadir ({ setEstrellas, estrellas }) {
  // Esto es para que cuando añada comentario se pongan a cero las estrellas
  useEffect(() => {
    // Comprobamos que no haya estrellas seleccionadas
    if (estrellas === 0) {
      // Actualizamos el estilo ( la clase .star pinta una estrella sin colorear)
      setStyles(['star', 'star', 'star', 'star', 'star'])
    }
  }, [estrellas]) // El efecto se realizará al renderizar el componente por primera vez y cada vez que cambie el estado estrellas.

  // Estado que controla los estilos de las estrellas, por defecto todas sin colorear.
  const [styles, setStyles] = useState(['star', 'star', 'star', 'star', 'star'])
  // Estado que controla que se ha fijado una puntuación, por defecto la puntuación fijada será 0 estrellas.
  const [checked, setChecked] = useState('0')

  // Manejador del evento onMouseOver
  const handlePuntuacion = (evento) => {
    // Guardamos en una variable el valor de la estrella sobre la que tenemos puesto el ratón
    const lastStar = evento.target.id
    // Calculamos los nuevos estilos a aplicar
    const newStyles = styles.map((style, index) => {
      // Añade las clases .star .checked a las posiciones del array de estilos menores o iguales a la última estrella seleccionada (estrella coloreada).
      if (index <= (lastStar - 1)) {
        style = 'star checked'
        return style
      } // Las demás posiciones del array de estilos se rellenan con la clase .star (estrella sin colorear)
      style = 'star'
      return style
    })
    // Controlamos en que casos se cambia el estilo
    // Cambiamos el estilo si el estado anterior era de 0 estrellas seleccionadas
    if (checked === '0') {
      setStyles(newStyles)
    // Cambiamos el estilo si el estado anterior coincide con la selección actual
    } else if (checked === lastStar) {
      setStyles(newStyles)
    }
  }

  // Manejador del evento onClick:
  const handleChecked = (evento) => {
    // Si el estado anterior era 0.
    if (checked === '0') {
      // Actualizamos el valor de los estados
      setChecked(evento.target.id)
      setEstrellas(Number(evento.target.id))
    // Si el estado anterior coincide con la selección actual(reinciar)
    } else if (checked === evento.target.id) {
      // Ponemos a cero los estados
      setChecked('0')
      setEstrellas(0)
    // Si el estado anterior no coincide con la selección actual (actualizar)
    } else if (checked !== evento.target.id) {
      // Actualizamos el valor de los estados
      setChecked(evento.target.id)
      setEstrellas(Number(evento.target.id))
      // Calculamos el nuevo estilo
      const newStyles = styles.map((style, index) => {
        if (index < evento.target.id) {
          return 'star checked'
        } else {
          return 'star'
        }
      })
      // Actualizamos estilo
      setStyles(newStyles)
    }
  }

  // Manejador del evento onMouseOut
  const defaultStyles = () => {
    // Comprobamos que no esté seleccionada ninguna estrella
    if (checked === '0') {
      // Calcula estilo de todas las estrellas sin colorear
      const newStyles = styles.map(style => 'star')
      // Actualiza el estilo
      setStyles(newStyles)
    }
  }
  return (
    <div className='comment-form-footer-stars'>
      <span
        id='1'
        className={styles[0]}
        onMouseOver={handlePuntuacion}
        onMouseOut={defaultStyles}
        onClick={handleChecked}
      >'
      </span>
      <span
        id='2'
        className={styles[1]}
        onMouseOver={handlePuntuacion}
        onMouseOut={defaultStyles}
        onClick={handleChecked}
      >'
      </span>
      <span
        id='3'
        className={styles[2]}
        onMouseOver={handlePuntuacion}
        onMouseOut={defaultStyles}
        onClick={handleChecked}
      >'
      </span>
      <span
        id='4'
        className={styles[3]}
        onMouseOver={handlePuntuacion}
        onMouseOut={defaultStyles}
        onClick={handleChecked}
      >'
      </span>
      <span
        id='5'
        className={styles[4]}
        onMouseOver={handlePuntuacion}
        onMouseOut={defaultStyles}
        onClick={handleChecked}
      >'
      </span>
    </div>
  )
}

export function Estrellas ({ setEstrellas, estrellas, isComment }) {
  const firstStyle = ['star', 'star', 'star', 'star', 'star'].map((style, index) => {
    if (index < estrellas && estrellas <= 2) {
      return 'star badComment'
    } else if (index < estrellas) {
      return 'star checked'
    }
    return 'star'
  })
  return (
    isComment
      ? <EstrellasComentario firstStyle={firstStyle} />
      : <EstrellasAnadir setEstrellas={setEstrellas} estrellas={estrellas} />
  )
}
