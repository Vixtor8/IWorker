'use strict';
const bcryptjs = require('bcryptjs')
const salt = bcryptjs.genSaltSync(10)
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      usuario.hasOne(models.worker, { foreignKey: 'idUsuario' });
      
    }
  }
  usuario.init({
    nombre: {
      allowNull: false,
      type: DataTypes.STRING
    },
    apellidos: {
      allowNull: false,
      type: DataTypes.STRING
    },
    telefono: {
      allowNull: false,
      type: DataTypes.STRING
    },
    correo: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true
      },
    },
    foto: {type: DataTypes.STRING},
    password: {
      allowNull: false,
      type: DataTypes.STRING,
      set (value) {
        this.setDataValue('password', bcryptjs.hashSync(value, salt))
      }
    },
    token: {
      allowNull: true,
      type: DataTypes.STRING
    },
    tokenExpiration: {
      allowNull: true,
      type: DataTypes.DATE
    }
    }, {
    tableName: 'usuarios',
    sequelize,
    modelName: 'usuario',
  });
  return usuario;
};