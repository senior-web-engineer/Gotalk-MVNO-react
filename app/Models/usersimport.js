'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserSimPort extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  UserSimPort.init({
    phoneNumber: DataTypes.STRING,
    accountNumber: DataTypes.STRING,
    firstName: DataTypes.STRING,
    pinNumber: DataTypes.STRING,
    addressLine: DataTypes.STRING,
    state: DataTypes.STRING,
    addressLine2: DataTypes.STRING,
    zip: DataTypes.STRING,
    status: DataTypes.STRING,
    messageCode: DataTypes.STRING,
    subscribeBundleStatus: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UserSimPort',
  });
  return UserSimPort;
};
