'use strict'
//crear validacion para worker
const WorkerController = require('../controllers/WorkerController')

module.exports = (options) => {
    const app = options.app
    const middlewares = options.middlewares

    app.route('/worker')
    .post(
    middlewares.isLoggedIn,
    WorkerController.createOrUpdateWorker)
    .get(
    middlewares.isLoggedIn,
    WorkerController.getWorkerIdUsuario
    )
    .delete(
    middlewares.isLoggedIn,
    WorkerController.deleteWorker
    )
    app.route('/workers/busqueda/:workercategoriaId')
    .get(
    middlewares.isLoggedIn,
    WorkerController.getWorkerBusqueda
    )
    app.route('/workers/categorias/')
    .get(
    middlewares.isLoggedIn,
    WorkerController.getWorkerCategorias
    )

}