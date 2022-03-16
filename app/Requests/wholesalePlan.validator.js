const {body} = require('express-validator');
const db = require("../Models");
const WholesalePlan = db.WholesalePlan;

exports.rule = (type) => {

    let rules = [];

    switch (type) {
        case "create":
            rules = [
                body('planName').isString().isLength({min: 1, max: 255}).exists().custom(value => {
                    return WholesalePlan.findOne({where: {planName: value}}).then(val => {
                        if (val) return Promise.reject('Plan name already in use');
                    })
                }),
                body('planType').isString().isLength({min: 1, max: 255}).exists(),
                body('unitCap').isInt().exists(),
                body('overage').isFloat().exists(),
                body('WPS').isString().exists().custom(value => {
                    return WholesalePlan.findOne({where: {WPS: value}}).then(val => {
                        if (val) return Promise.reject('WPS already in use');
                    })
                })
            ];
            break;
        case "update":
            rules = [
                body('planName').isString().isLength({min: 1, max: 255}).optional().custom(value => {
                    return WholesalePlan.findOne({where: {planName: value}}).then(val => {
                        if (val) return Promise.reject('Plan name already in use');
                    })
                }),
                body('planType').isString().isLength({min: 1, max: 255}).optional(),
                body('unitCap').isInt().optional(),
                body('overage').isFloat().optional(),
                body('WPS').isString().optional(),
            ];
            break;
    }
    return rules;
}