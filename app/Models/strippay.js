'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StripPay extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      StripPay.belongsTo(models.UserPay, { foreignKey: 'userPayId', as: 'userPay'});
    }
  };
  StripPay.init({
    idStrip: DataTypes.STRING,
    payToken: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'StripPay',
  });
  return StripPay;
};