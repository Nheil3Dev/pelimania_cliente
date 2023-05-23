import { Link } from 'react-router-dom'
import { ROUTES } from '../utils/const'
import './Page404.css'

export default function Page404 () {
  return (
    <>
      <section className='page404-container'>
        <h2>Esta página no existe</h2>
        <Link to={ROUTES.INICIO}>
          <p className='home-link'>Volver a la página de inicio</p>
        </Link>
      </section>
    </>
  )
}
