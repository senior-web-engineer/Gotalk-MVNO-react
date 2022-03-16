const {body} = require('express-validator');
const db = require("../Models");
const PlintronPlan = db.PlintronPlan;

exports.rule = () => {

    let rule = [
        body('name','Invalid name').exists().isString().isLength({ min:1, max:255 }).custom(value => {
            return PlintronPlan.findOne({where: {name: value}}).then(val => {
                if (val) return Promise.reject('Name already in use');
            });
        }),
        body('costPerMonth').isFloat().exists(),
        body('minuteCount').isInt().exists(),
        body('SMSCount','Invalid number. of SMS').isInt().exists(),
        body('internetCount','Invalid amount of data(MB)').isInt().exists(),
        body('expiry','Invalid type (B2B or B2C)').isString().exists(),
        body('planID','Invalid hotspot/wifi calling etc').isInt().exists(),
        body('autoRenewal').isBoolean().exists(),
        body('midcycleRateChange').isBoolean().exists()
    ];
    return rule;
}