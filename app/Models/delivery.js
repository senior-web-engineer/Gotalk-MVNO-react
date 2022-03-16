'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Delivery extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Delivery.hasOne(models.UserSimPlan, {foreignKey: 'deliveryId'});
    }
  };
  Delivery.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    status: DataTypes.STRING,
    country:  DataTypes.STRING,
    city:  DataTypes.STRING,
    street:  DataTypes.STRING,
    apartment: DataTypes.STRING,
    zip: DataTypes.STRING,
    deliveryType: DataTypes.STRING,
    deliveryId: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Delivery',
  });
  return Delivery;
};