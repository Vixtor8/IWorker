import { post, put, deleteItemAsync, get } from './helpers/ApiRequestsHelper'

function login (data) {
  return post('usuarios/login', data)
}

function register (data) {
  return post('usuarios/registro', data)
}

function isTokenValid (storedToken) {
  return put('usuarios/isTokenValid', { token: storedToken })
}

function update (data) {
  return put('usuarios', data)
}

function destroy (data){
  return deleteItemAsync('usuarios', data)
}

function getUsuario (id) {
  return get(`usuarios/${id}`)
}

export { login, register, isTokenValid, update, destroy, getUsuario }
