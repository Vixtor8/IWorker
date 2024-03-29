'use strict'
const models = require('../models/index')
const Usuario = models.usuario
const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')


exports.registerUsuario = function (req, res) {
  const err = validationResult(req)
  if (err.errors.length > 0) {
    res.status(422).send(err)
  } else {
    register(req, res)
  }
}


const findByToken = function (providedToken) {
  return Usuario.findOne({ where: { token: providedToken }, attributes: { exclude: ['password'] } })
    .then(user => {
      if (!user) { // token not valid
        throw new Error('Token not valid')
      }
      if (user.tokenExpiration < new Date()) {
        throw new Error('Token expired.')
      }
      return user ? user.dataValues : null
    })
    .catch(err => {
      throw err
    })
}

exports.findByToken = findByToken

exports.isTokenValid = async function (req, res) {
  try {
    const user = await findByToken(req.body.token)
    res.json(user)
  } catch (err) {
    return res.status(403).send({ errors: err.message })
  }
}

exports.login = async function (req, res) {
  const err = validationResult(req)
  if (err.errors.length > 0) {
    res.status(422).send(err)
  }
  try {
    const user = await Usuario.findOne({ where: { correo: req.body.correo } })
    if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(401).send({ errors: [{ param: 'login', msg: 'Credenciales erroneos' }] })
    } else {
      user.token = crypto.randomBytes(20).toString('hex')
      const expirationDate = new Date()
      expirationDate.setHours(expirationDate.getHours() + 1)
      user.tokenExpiration = expirationDate
      await user.save()
      const userWithoutPassword = await Usuario.findByPk(user.id, { attributes: { exclude: ['password'] } })
      res.json(userWithoutPassword)
    }
  } catch (err) {
    res.status(401).send(err)
  }
}

exports.show = async function (req, res) {
  try {
    const user = await Usuario.findByPk(req.params.usuarioId, {
      attributes: ['nombre', 'apellidos', 'correo', 'telefono', 'foto']
    })
    res.json(user)
  } catch (err) {
    res.status(404).send(err)
  }
}

exports.update = async function (req, res) {
  const err = validationResult(req)
  if (err.errors.length > 0) {
    res.status(422).send(err)
  } else {
    if (typeof req.file !== 'undefined') {
      req.body.foto = req.file.path
    }
    try {
      await Usuario.update(req.body, { where: { id: req.user.id } })
      const user = await Usuario.findByPk(req.user.id, { attributes: { exclude: ['password'] } })
      res.json(user)
    } catch (err) {
      res.status(422).send(err)
    }
  }
}

exports.destroy = async function (req, res) {
  try {
    const result = await Usuario.destroy({ where: { id: req.user.id } })
    let message = ''
    if (result === 1) {
      message = 'Borrado correctamente.'
    } else {
      message = 'No se ha podido borrar.'
    }
    res.json(message)
  } catch (err) {
    res.status(500).send(err)
  }
}

async function register (req, res) {
  const newUser = Usuario.build(req.body)
  newUser.token = crypto.randomBytes(20).toString('hex')
  const expirationDate = new Date()
  expirationDate.setHours(expirationDate.getHours() + 1)
  newUser.tokenExpiration = expirationDate
  
  if (typeof req.file !== 'undefined') {
    newUser.foto = req.file.path
  }
  try {
    const registeredUser = await newUser.save()
    res.json(registeredUser)
  } catch (err) {
    if (err.name.includes('ValidationError') || err.name.includes('SequelizeUniqueConstraintError')) {
      res.status(422).send(err)
    } else {
      res.status(500).send(err)
    }
  }
}