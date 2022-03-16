'use strict';
const {
  Model
} = require('sequelize');

const PROTECTED_ATTRIBUTES = ['createdAt','updatedAt']

module.exports = (sequelize, DataTypes) => {
  class Plan extends Model {

    toJSON () {
      let attributes = Object.assign({}, this.get())
      for (let a of PROTECTED_ATTRIBUTES) {
        delete attributes[a]
      }
      return attributes
    }

    static associate(models) {
      // define association here
    }
  };
  Plan.init({
    name: DataTypes.STRING,
    costPerMonth: DataTypes.FLOAT,
    costBuyPlan: DataTypes.FLOAT,
    minuteCount: DataTypes.INTEGER,
    SMSCount: DataTypes.INTEGER,
    internetCount: DataTypes.INTEGER,
    isCompany: DataTypes.BOOLEAN,
    hotspot: DataTypes.BOOLEAN,
    description: DataTypes.TEXT,
    props:  DataTypes.JSON,
    rating:  DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Plan',
  });
  return Plan;
};