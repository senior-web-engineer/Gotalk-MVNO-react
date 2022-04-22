'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class UserPay extends Model {
        static associate(models) {
            UserPay.belongsTo(models.User, {foreignKey: 'userId', as: 'user'});
        }
    };
    UserPay.init({
        action: DataTypes.STRING,
        sum: DataTypes.FLOAT,
        status: DataTypes.STRING,
        type: DataTypes.STRING,
        paymentType: DataTypes.STRING,
        productId: DataTypes.ARRAY(DataTypes.INTEGER),
        couponId: DataTypes.INTEGER,
        discountAmount: DataTypes.FLOAT,
        doCaptureLater: DataTypes.BOOLEAN
    }, {
        sequelize,
        modelName: 'UserPay',
    });
    return UserPay;
};
