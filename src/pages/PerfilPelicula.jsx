import { useState } from 'react'
import { Comentarios } from '../components/Comentarios'
import { Enlaces } from '../components/Enlaces'
import { Header } from '../components/Header'
import { InfoExtraPelicula } from '../components/InfoExtraPelicula'
import { InfoPelicula } from '../components/InfoPelicula'
import { usePelicula } from '../hooks/usePelicula'
import './PerfilPelicula.css'

export default function PerfilPelicula () {
  // Obtenemos la información necesaria del custom hook usePelicula.
  const { pelicula, siguiendo, setSiguiendo } = usePelicula()
  // Estado para controlar el componente que se renderiza (Comentarios o InfoExtraPelicula)
  const [visible, setVisible] = useState(false)
  return (
    <>
      <Header />
      <main className='main-movie-profile'>
        <InfoPelicula pelicula={pelicula} setRefresh={setSiguiendo} />
        <Enlaces setVisible={setVisible} visible={visible} opcion1='Información adicional' opcion2='Comentarios' />
        {visible && <InfoExtraPelicula pelicula={pelicula} />}
        {!visible && <Comentarios siguiendo={siguiendo} />}
      </main>
    </>
  )
}
