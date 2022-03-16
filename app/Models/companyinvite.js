'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CompanyInvite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CompanyInvite.belongsTo(models.Company, { foreignKey: 'companyId', as: 'company'});
    }
  };
  CompanyInvite.init({
    invite: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'CompanyInvite',
  });
  return CompanyInvite;
};