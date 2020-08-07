'use strict';
const {
  Model
} = require('sequelize');
const { hash } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        notEmpty: {
          args: true,
          msg: "Email Required"
        },
        isEmail: {
          args: true,
          msg: "format email required"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Password required"
        },
        len: [5, 20]
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate(User){
        User.password = hash(User.password)
      }
    }
  });
  return User;
};