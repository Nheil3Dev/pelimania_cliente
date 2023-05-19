import { useEffect, useState } from 'react'

export function usePeliculasPerfil ({ peliculas }) {
  const [width, setWidth] = useState(window.innerWidth)
  const [anchoPantalla, setAnchoPantalla] = useState(Math.floor(((width * 75 / 100) - 40) / 220))
  const [ultimaPeli, setUltimaPeli] = useState(anchoPantalla)
  const [primeraPeli, setPrimeraPeli] = useState(0)
  const [peliculasFiltro, setPeliculasFiltro] = useState(peliculas.slice(primeraPeli, ultimaPeli))
  const [visibleRight, setVisibleRight] = useState(true)
  const [visibleLeft, setVisibleLeft] = useState(false)

  const avanzaPelicula = () => {
    if (peliculas.length > ultimaPeli) {
      if (visibleLeft === false) {
        setVisibleLeft(true)
      }
      const newUltimaPeli = ultimaPeli + 1
      const newPrimeraPeli = primeraPeli + 1
      setUltimaPeli(newUltimaPeli)
      setPrimeraPeli(newPrimeraPeli)
      setPeliculasFiltro(peliculas.slice(newPrimeraPeli, newUltimaPeli))
    }
    if (peliculas.length - ultimaPeli === 1) {
      setVisibleRight(false)
    }
  }

  const retrocedePelicula = () => {
    if (ultimaPeli - anchoPantalla > 0) {
      if (visibleRight === false) {
        setVisibleRight(true)
      }
      const newUltimaPeli = ultimaPeli - 1
      const newPrimeraPeli = primeraPeli - 1
      setUltimaPeli(newUltimaPeli)
      setPrimeraPeli(newPrimeraPeli)
      setPeliculasFiltro(peliculas.slice(newPrimeraPeli, newUltimaPeli))
      if (newPrimeraPeli === 0) {
        setVisibleLeft(false)
      }
    }
  }

  useEffect(() => {
    const handleResize = (event) => {
      // console.log(event.currentTarget.innerWidth)
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
    visibleRight,
    anchoPantalla,
    peliculasFiltro,
    avanzaPelicula,
    retrocedePelicula
  }
}
