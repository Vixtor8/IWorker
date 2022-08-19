'use strict'
const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10)
const fs = require('fs')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {})
    */
    module.exports.copyFiles()

    await queryInterface.bulkInsert('usuarios',
      [
        { nombre: 'Victor', apellidos: 'Granero Gil', telefono: '684017682', correo: 'victor@gmail.com', password: bcrypt.hashSync('contraseña', salt), foto: process.env.AVATARS_FOLDER + '/maleAvatar.png' },
      ], {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {})
     */
  },
  copyFiles: () => {
    const originDir = 'example_api_client/example_assets/'
    const destinationDir = process.env.AVATARS_FOLDER + '/'
    if (!fs.existsSync(destinationDir)) {
      fs.mkdirSync(destinationDir, { recursive: true })
    }

    fs.copyFile(originDir + 'maleAvatar.png', destinationDir + 'maleAvatar.png', (err) => {
      if (err) throw err
    })
  }
}
