import './Enlaces.css'

// Componente que se encarga de renderizar un enlace
// visible: indica si está selecionado
// children: Texto del enlace
// style: despendiendo si está seleccionado o no tendrá un estilo diferente
// handleChange: Manejador del evento onChange.
export function Enlace ({ visible, children, style, handleChange }) {
  return (
    <label className={style}>
      {children}
      <input type='radio' className='anchors-input' name='radio' onChange={handleChange} checked={visible} />
    </label>
  )
}

// Componente encargado de renderizar los enlaces
export function Enlaces ({ setVisible, visible, opcion1, opcion2 }) {
  // Controla el estilo del enlace seleccionado
  const selected = visible ? 'anchors-labels visible' : 'anchors-labels'
  // Controla el estilo del enlace no seleccionado
  const noSelected = !visible ? 'anchors-labels visible' : 'anchors-labels'
  // Manejador del evento onChange
  const handleChange = (evento) => {
    // Comprueba que está seleccionado
    if (evento.target.checked) {
      // Cambia el valor del estado visible (el que está seleccionado pasa a no estar y el que no está pasa a estarlo)
      setVisible(!visible)
    }
  }

  return (
    <form>
      <div className='anchors'>
        <Enlace style={selected} handleChange={handleChange} visible={visible}>
          {opcion1}
        </Enlace>
        <Enlace style={noSelected} handleChange={handleChange} visible={!visible}>
          {opcion2}
        </Enlace>
      </div>
    </form>
  )
}
