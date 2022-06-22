'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class valoracion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      valoracion.belongsTo(models.usuario, {foreignKey: 'idUsuario', as: 'usuario'});
      valoracion.belongsTo(models.worker, {foreignKey: 'idWorker', as: 'worker'});
    }
  }
  valoracion.init({
    texto: DataTypes.STRING,
    estrellas: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'valoracion',
  });
  return valoracion;
};