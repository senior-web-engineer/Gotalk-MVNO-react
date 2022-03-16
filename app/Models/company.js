'use strict';
const {
  Model
} = require('sequelize');

const PROTECTED_ATTRIBUTES = ['createdAt','updatedAt']

module.exports = (sequelize, DataTypes) => {
  class Company extends Model {

    toJSON () {
      let attributes = Object.assign({}, this.get())
      for (let a of PROTECTED_ATTRIBUTES) {
        delete attributes[a]
      }
      return attributes
    }

    static associate(models) {
      Company.hasMany(models.User, { foreignKey: 'companyId'})
    }
  };

  Company.STATUSE = ['active', 'blocked'];

  Company.init({
    name: DataTypes.STRING,
    status: DataTypes.STRING,
    ownerId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Company',
  });
  return Company;
};