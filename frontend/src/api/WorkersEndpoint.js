import { get, post, deleteItemAsync } from './helpers/ApiRequestsHelper'

function createWorker(data) {
    return post('worker', data)
}
function getWorkersCategorias() {
    return get('workers/categorias')
}
function getWorkerIdUsuario() {
    return get('worker')
}
function getWorkersBusqueda(workercategoriaId) {
    return get(`workers/busqueda/${workercategoriaId}`)
}
function deleteWorker(data) {
    return deleteItemAsync('worker', data)
}

export { createWorker, getWorkersCategorias, getWorkerIdUsuario, getWorkersBusqueda, deleteWorker }