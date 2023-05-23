import { Navigate } from 'react-router-dom'
import { ROUTES } from '../utils/const'

export default function RequireAuth ({ sesion, children }) {
  if (!sesion) {
    return <Navigate to={ROUTES.INICIO} />
  }
  return (
    <>
      {children}
    </>
  )
}
