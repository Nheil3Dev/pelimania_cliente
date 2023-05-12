import { Header } from '../components/Header'
import { ListaPeliculas } from '../components/ListaPeliculas'
import { useBuscador } from '../hooks/useBuscador'
import './Buscador.css'

// Componente que se encarga de renderizar la página del buscador
// ultimaBusqueda: valor de la última busqueda realizada.
export default function Buscador () {
  // Obtenemos los datos necesarios del custom hook useBuscador
  const { obtenerPeliculas, busqueda, setBusqueda, peliculas, setPeliculas, error, ultimaBusqueda } = useBuscador()

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
    <>
      <Header ultimaBusqueda={ultimaBusqueda} isBuscador />
      <h1 className='title'>Buscador de películas</h1>
      <form className='movie-search-form' onSubmit={handleSubmit}>
        <input
          type='text'
          value={busqueda}
          onChange={handleChange}
          placeholder='Batman, Harry Potter...'
          className='movie-search-form-input'
        />
        <input type='submit' value='Buscar' className='movie-search-form-input' />
      </form>
      {peliculas.length > 0
        ? <ListaPeliculas peliculas={peliculas} />
        : <p style={{ color: '#ff7faa' }}>{error}</p>}
    </>
  )
}
