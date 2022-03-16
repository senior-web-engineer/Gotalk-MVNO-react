'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserPlanHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  UserPlanHistory.init({
    value: DataTypes.STRING,
    date: DataTypes.STRING,
    type: DataTypes.STRING,
    phone: DataTypes.STRING,
    callType: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UserPlanHistory',
  });
  return UserPlanHistory;
};