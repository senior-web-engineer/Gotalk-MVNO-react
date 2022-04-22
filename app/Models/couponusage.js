'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CouponUsage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CouponUsage.belongsTo(models.Coupon, {foreignKey: 'couponId'});
      CouponUsage.belongsTo(models.User, {foreignKey: 'userId'});
      CouponUsage.belongsTo(models.UserSimPlan, {foreignKey: 'userSimPlanIds'});
    }
  };
  CouponUsage.init({
    couponId: DataTypes.INTEGER,
    monthCount: DataTypes.INTEGER,
    userId: DataTypes.STRING,
    usedMonthCount: DataTypes.INTEGER,
    userSimPlanIds: DataTypes.ARRAY(DataTypes.INTEGER)
  }, {
    sequelize,
    modelName: 'CouponUsage',
  });
  return CouponUsage;
};
