'use strict'
const UserValidation = require('../controllers/validation/UserValidation')
const UserController = require('../controllers/UserController')

const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const fs = require('fs')
    fs.mkdirSync(process.env.AVATARS_FOLDER, { recursive: true })
    cb(null, process.env.AVATARS_FOLDER)
  },
  filename: function (req, file, cb) {
    cb(null, Math.random().toString(36).substring(7) + '-' + Date.now() + '.' + file.originalname.split('.').pop())
  }
})
const upload = multer({ storage: storage }).single('fotoPerfil')

module.exports = (options) => {
  const app = options.app
  const middlewares = options.middlewares

  app.route('/usuarios')
    .put(
      middlewares.isLoggedIn,
      upload,
      UserValidation.update(),
      UserController.update)
    .delete(
      middlewares.isLoggedIn,
      UserController.destroy)

  app.route('/usuarios/registro')
    .post(
      upload,
      UserValidation.create(),
      UserController.registerUsuario)

  app.route('/usuarios/login')
    .post(
      UserValidation.login(),
      UserController.login)

  app.route('/usuarios/isTokenValid')
    .put(UserController.isTokenValid)

  app.route('/usuarios/:usuarioId')
    .get(
      middlewares.isLoggedIn,
      UserController.show)

}
