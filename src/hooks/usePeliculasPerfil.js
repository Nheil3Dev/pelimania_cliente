import { useEffect, useState } from 'react'

export function usePeliculasPerfil ({ peliculas }) {
  const [width, setWidth] = useState(window.innerWidth)
  const [anchoPantalla, setAnchoPantalla] = useState(Math.floor(((width * 75 / 100) - 40) / 220))
  const [ultimaPeli, setUltimaPeli] = useState(anchoPantalla)
  const [primeraPeli, setPrimeraPeli] = useState(0)
  const [peliculasFiltro, setPeliculasFiltro] = useState(peliculas.slice(primeraPeli, ultimaPeli))
  const [visibleRight, setVisibleRight] = useState(true)
  const [visibleLeft, setVisibleLeft] = useState(false)

  useEffect(() => {
    const handleResize = (event) => {
      console.log(event.currentTarget.innerWidth)
      const newWidth = event.currentTarget.innerWidth
      setWidth(newWidth)
      const newAnchoPantalla = Math.floor(((newWidth * 75 / 100) - 40) / 220)
      setAnchoPantalla(newAnchoPantalla)
      if (peliculas.length - primeraPeli < newAnchoPantalla) {
        const newUltimaPeli = peliculas.length
        setUltimaPeli(newUltimaPeli)
        const newPrimeraPeli = newUltimaPeli - newAnchoPantalla
        setPrimeraPeli(newPrimeraPeli)
        const newPeliculas = peliculas.slice(newPrimeraPeli, newUltimaPeli)
        setPeliculasFiltro(newPeliculas)
        console.log('hola')
        if (peliculas.length - newUltimaPeli === 0) {
          setVisibleRight(false)
        }
      } else {
        const newUltimaPeli = primeraPeli + newAnchoPantalla
        setUltimaPeli(newUltimaPeli)
        const newPeliculas = peliculas.slice(primeraPeli, newUltimaPeli)
        setPeliculasFiltro(newPeliculas)
        if (peliculas.length - newUltimaPeli > 0) {
          setVisibleRight(true)
        } else {
          setVisibleRight(false)
        }
      }
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [width])

  return {
    visibleLeft,
    setVisibleLeft,
    visibleRight,
    setVisibleRight,
    anchoPantalla,
    setAnchoPantalla,
    primeraPeli,
    setPrimeraPeli,
    ultimaPeli,
    setUltimaPeli,
    peliculasFiltro,
    setPeliculasFiltro
  }
}
