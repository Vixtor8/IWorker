'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('usuarios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        allowNull: false,
        type: Sequelize.STRING
      },
      apellidos: {
        allowNull: false,
        type: Sequelize.STRING
      },
      telefono: {
        type: Sequelize.INTEGER
      },
      correo: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      foto: {
        type: Sequelize.STRING
      },
      password: {
        allowNull: false,
        type:Sequelize.STRING
      },
      token: {
        allowNull: false,
        type:Sequelize.STRING
      },
      tokenExpiration: {
        allowNull: true,
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('usuarios');
  }
};