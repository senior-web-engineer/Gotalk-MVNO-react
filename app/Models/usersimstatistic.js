'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserSimStatistic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  };
  UserSimStatistic.init({
    sms: DataTypes.INTEGER,
    min: DataTypes.INTEGER,
    internet: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'UserSimStatistic',
  });
  return UserSimStatistic;
};