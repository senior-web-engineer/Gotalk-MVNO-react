'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WholesalePlan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  WholesalePlan.init({
    planName: DataTypes.STRING,
    planType: DataTypes.STRING,
    unitCap: DataTypes.INTEGER,
    overage: DataTypes.FLOAT,
    WPS: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'WholesalePlan',
  });
  return WholesalePlan;
};