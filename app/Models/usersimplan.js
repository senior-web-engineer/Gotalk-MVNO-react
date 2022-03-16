'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserSimPlan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserSimPlan.belongsTo(models.PlintronSim, {foreignKey: 'plintronSimId'});
      UserSimPlan.belongsTo(models.Plan, {foreignKey: 'planId', as: 'plan'});
      UserSimPlan.belongsTo(models.Plan, {foreignKey: 'newPlanId', as: 'newPlan'});
      UserSimPlan.belongsTo(models.PlintronPlan, {foreignKey: 'plintronPlanId'});
      UserSimPlan.belongsTo(models.User, {foreignKey: 'userId'});
      UserSimPlan.belongsTo(models.Delivery, {foreignKey: 'deliveryId'});
      UserSimPlan.belongsTo(models.WholesalePlan, {foreignKey: 'wholesalePlanId'});
      UserSimPlan.hasMany(models.UserSimStatistic, {foreignKey: 'userSimPlanId'});
      UserSimPlan.hasMany(models.UserPlanHistory, {foreignKey: 'userSimPlanId'});
    }
  };

  UserSimPlan.STATUSE = ['active', 'blocked','company_blocked'];

  UserSimPlan.init({
    status: DataTypes.STRING,
    simType: DataTypes.STRING,
    expireDate: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'UserSimPlan',
  });
  return UserSimPlan;
};