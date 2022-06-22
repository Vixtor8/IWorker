'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class workercategoria extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      workercategoria.hasMany(models.worker, {foreignKey: 'workercategoriaId'})
    }
  }
  workercategoria.init({
    nombre: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'workercategoria',
  });
  return workercategoria;
};