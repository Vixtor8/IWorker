'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class trabajo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      trabajo.belongsTo(models.worker, {foreignKey: 'idtrabajo', as: 'worker'});
    }
  }
  trabajo.init({
    nombre: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'trabajo',
  });
  return trabajo;
};