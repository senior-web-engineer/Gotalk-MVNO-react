'use strict';
const {
  Model
} = require('sequelize');

const PROTECTED_ATTRIBUTES = ['createdAt','updatedAt']

module.exports = (sequelize, DataTypes) => {
  class PlintronSim extends Model {

    toJSON () {
      let attributes = Object.assign({}, this.get())
      for (let a of PROTECTED_ATTRIBUTES) {
        delete attributes[a]
      }
      return attributes
    }

    static associate(models) {
      PlintronSim.hasOne(models.UserSimPlan, {foreignKey: 'plintronSimId'});
    }
  };

  PlintronSim.STATUSE = ['FREE', 'RESERVE', 'BUSY'];

  PlintronSim.init({
    ICCID: DataTypes.STRING,
    PINOne: DataTypes.STRING,
    PUKOne: DataTypes.STRING,
    PINTwo: DataTypes.STRING,
    PUKTwo: DataTypes.STRING,
    IMSI: DataTypes.STRING,
    MSISDN: DataTypes.STRING,
    status: DataTypes.STRING,
    PMSISDN: DataTypes.STRING,
    sum: DataTypes.FLOAT,
    type: DataTypes.STRING,
    newIMSI: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'PlintronSim',
  });
  return PlintronSim;
};