'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Movie.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Title Required'
        },
        notNull: {
          msg: 'Title Required'
        }
      }
    },
    genre: DataTypes.STRING,
    released_date: DataTypes.DATE,
    director: DataTypes.STRING,
    plot: DataTypes.STRING,
    poster: DataTypes.STRING,
    preview: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Movie',
  });
  return Movie;
};