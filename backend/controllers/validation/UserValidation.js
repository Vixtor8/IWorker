const { check } = require('express-validator')
const FileValidationHelper = require('./FileValidationHelper')

const maxFileSize = 10000000 // around 10Mb

module.exports = {
  create: () => {
    return [
      check('file')
        .custom((value, { req }) => {
          return FileValidationHelper.checkFileIsImage(req.foto)
        })
        .withMessage('Introduzca solo imágenes (jpeg, png, svg).'),
      check('file')
        .custom((value, { req }) => {
          return FileValidationHelper.checkFileMaxSize(req.file, maxFileSize)
        })
        .withMessage('El tamaño máximo de fotos es ' + maxFileSize / 1000000 + 'MB'),
      check('password', 'La contraseña debe ser de más de 3 de longitud').isLength({ min: 3 })
    ]
  },

  update: () => {
    return [
      check('file')
        .custom((value, { req }) => {
          return FileValidationHelper.checkFileIsImage(req.file)
        })
        .withMessage('Introduzca solo imágenes (jpeg, png, svg).'),
      check('file')
        .custom((value, { req }) => {
          return FileValidationHelper.checkFileMaxSize(req.file, maxFileSize)
        })
        .withMessage('El tamaño máximo de fotos es ' + maxFileSize / 1000000 + 'MB')
    ]
  },

  login: () => {
    return [
      check('correo', 'El correo es obligatorio.').not().isEmpty(),
      check('correo', 'Correo no válido.').isEmail(),
      check('password', 'La contraseña es obligatoria.').not().isEmpty()
    ]
  }
}
