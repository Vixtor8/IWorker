'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class worker extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      worker.belongsTo(models.usuario, {foreignKey: 'idUsuario', as: 'usuario'});
      worker.belongsTo(models.workercategoria, {foreignKey: 'workercategoryId', as: 'workercategoria'});
      worker.hasMany(models.valoracion, {foreignKey: 'workerId', as: 'valoraciones'});
      worker.hasMany(models.trabajo, {foreignKey: 'workerId', as: 'trabajos'});
    }
  }
  worker.init({
    profesion: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    localidad: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'worker',
  });
  return worker;
};