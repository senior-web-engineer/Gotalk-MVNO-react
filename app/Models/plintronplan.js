'use strict';
const {
    Model
} = require('sequelize');

const PROTECTED_ATTRIBUTES = ['createdAt', 'updatedAt']

module.exports = (sequelize, DataTypes) => {
    class PlintronPlan extends Model {

        toJSON() {
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
    PlintronPlan.init({
        name: DataTypes.STRING,
        costPerMonth: DataTypes.FLOAT,
        minuteCount: DataTypes.INTEGER,
        SMSCount: DataTypes.INTEGER,
        internetCount: DataTypes.INTEGER,
        expiry: DataTypes.STRING,
        planID: DataTypes.INTEGER,
        autoRenewal: DataTypes.BOOLEAN,
        midcycleRateChange: DataTypes.BOOLEAN
    }, {
        sequelize,
        modelName: 'PlintronPlan',
    });
    return PlintronPlan;
};