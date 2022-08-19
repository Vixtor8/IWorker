'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('workercategorias',
    [
      {nombre: 'Albañil'},
      {nombre: 'Carpintero'},
      {nombre: 'Cerrajero'},
      {nombre: 'Electricista'},
      {nombre: 'Fontanero'},
      {nombre: 'Limpiador'},
      {nombre: 'Niñero'},
      {nombre: 'Pintor'},
      {nombre: 'Profesor'},
      {nombre: 'Otro'}      
    ], {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
