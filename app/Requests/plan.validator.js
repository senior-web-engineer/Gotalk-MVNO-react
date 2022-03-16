const {body} = require('express-validator');
const db = require("../Models");
const Plan = db.Plan;

exports.rule = () => {

    let rule = [
        body('name','Invalid name').exists().isString().isLength({ min:1, max:255 }).custom(value => {
            return Plan.findOne({where: {name: value}}).then(val => {
                if (val) return Promise.reject('Name already in use');
            });
        }),
        body('costPerMonth','Invalid cost per month').isFloat().exists(),
        body('costBuyPlan','Invalid cost to buy a plan').isFloat().exists(),
        body('minuteCount','Invalid number of Minutes').isInt().exists(),
        body('SMSCount','Invalid number. of SMS').isInt().exists(),
        body('internetCount','Invalid amount of data(MB)').isInt().exists(),
        body('isCompany','Invalid type (B2B or B2C)').isBoolean().exists(),
        body('hotspot','Invalid hotspot/wifi calling etc').isBoolean().exists(),
        body('description','Invalid description').optional().isLength({ min:0, max:3000 }),
        body('props','Invalid props').optional().isObject()
    ];
    return rule;
}