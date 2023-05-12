import { useNavigate } from 'react-router-dom'
import { useBuscador } from '../hooks/useBuscador'
import './FormularioBuscador.css'

export function FormularioBuscador () {
  const { obtenerPeliculas, busqueda, setBusqueda, setPeliculas, ultimaBusqueda } = useBuscador()
  const navigate = useNavigate()
  // Manejador del evento onSubmit
  const handleSubmit = async (event) => {
    // Cancelamos el comportamiento por defecto
    event.preventDefault()
    // Actualizamos el valor de la última búsqueda
    ultimaBusqueda.current = busqueda
    // Obtenemos las películas
    const nuevasPeliculas = await obtenerPeliculas({ busqueda })
    // Actualizamos el array de películas con las películas obtenidas.
    setPeliculas(nuevasPeliculas)
    navigate('/Pelimania/buscador')
  }

  // Manejador del evento onChange
  const handleChange = (event) => {
    // Obtenemos el valor introducido en el input y guardamos su valor en una variable
    const nuevaBusqueda = event.target.value
    // Comprobamos que no sea un espacio
    if (nuevaBusqueda === ' ') return
    // Actualizamos el valor de la búsqueda.
    setBusqueda(nuevaBusqueda)
  }
  return (
    <form className='movie-search-form-header' onSubmit={handleSubmit}>
      <input
        type='text'
        value={busqueda}
        onChange={handleChange}
        placeholder='Batman, Harry Potter...'
        className='movie-search-form-input-header'
      />
      <input type='submit' value='Buscar' className='movie-search-form-input-submit-header' />
    </form>
  )
}
