'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Coupon extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Coupon.belongsTo(models.Plan, {foreignKey: 'planId', as: 'plan'});
      Coupon.hasMany(models.CouponUsage,{ foreignKey: 'couponId', as: 'CouponUsages'});
    }
  };
  Coupon.init({
    code: DataTypes.STRING,
    monthCount: DataTypes.STRING,
    planId: DataTypes.INTEGER,
    expireDate: DataTypes.DATE,
    isActive: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Coupon',
  });
  return Coupon;
};
