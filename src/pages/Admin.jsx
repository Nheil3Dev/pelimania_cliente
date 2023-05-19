import { ComentariosAdmin } from '../components/ComentariosAdmin'
import { Enlaces } from '../components/Enlaces'
import { Header } from '../components/Header'
import { Usuarios } from '../components/Usuarios'
import { AdminFiltersProvider } from '../context/adminFilters'
import { useAdmin } from '../hooks/useAdmin'

// Componente que se encarga de renderizar la página de administración
export default function Admin () {
  const { visible, setVisible, usuarios, setBorrado } = useAdmin()
  return (
    <>
      <Header />
      <main>
        <h1 className='title'>Administrador</h1>
        <Enlaces setVisible={setVisible} visible={visible} opcion1='Usuarios' opcion2='Comentarios' />
        {visible && <Usuarios usuarios={usuarios} setBorrado={setBorrado} />}
        <AdminFiltersProvider>
          {!visible && <ComentariosAdmin usuarios={usuarios} />}
        </AdminFiltersProvider>
      </main>
    </>
  )
}
