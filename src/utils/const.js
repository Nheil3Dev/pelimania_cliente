const url = 'http://localhost:3001/api/'

export const URLS = {
  API_BUSCADOR: 'https://www.omdbapi.com/?apikey=4287ad07&s=',
  API_ID: 'https://www.omdbapi.com/?apikey=4287ad07&i=',
  USUARIO_LOGIN: `${url}usuarios/comprobar`,
  USUARIO_REGISTRO: `${url}usuarios/anadir`,
  USUARIOS_ADMIN: `${url}usuarios/todos`,
  USUARIOS_BORRAR: `${url}usuarios/borrar`,
  PELICULAS_BASE: `${url}peliculas/anadir`,
  PELICULAS_SELECT: `${url}peliculas/usuario`,
  PELICULAS_COMPROBAR: `${url}peliculas/comprobar`,
  PELICULAS_COMPROBAR_BASE: `${url}peliculas/comprobarBase`,
  PELICULAS_SEGUIR: `${url}peliculas/seguir`,
  PELICULAS_DEJAR_SEGUIR: `${url}peliculas/dejarSeguir`,
  COMENTARIOS_USER: `${url}comentarios/usuario`,
  COMENTARIOS_PELICULA: `${url}comentarios/pelicula`,
  COMENTARIOS_ANADIR: `${url}comentarios/anadir`,
  COMENTARIOS_ADMIN: `${url}comentarios/todos`,
  COMENTARIO_BORRAR: `${url}comentarios/borrar`
}

export const ROUTES = {
  INICIO: '/Pelimania/',
  BUSCADOR: '/Pelimania/buscador',
  PERFIL: '/Pelimania/perfil',
  USUARIO: '/Pelimania/perfil/:usuario',
  PELICULA: '/Pelimania/:id',
  ADMIN: '/Pelimania/admin'
}
