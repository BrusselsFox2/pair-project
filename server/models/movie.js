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
      },
      allowNull: false
    },
    genre: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Genre Required'
        },
        notNull: {
          msg: 'Genre Required'
        }
      },
      allowNull: false
    },
    poster: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Poster Url Required'
        },
        notNull: {
          msg: 'Poster URL Required'
        }
      },
      allowNull: false
    },
    review: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Review URL Required'
        },
        notNull: {
          msg: 'Review URL Required'
        }
      },
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
    }
  }, {
    sequelize,
    modelName: 'Movie',
  });
  return Movie;
};