const {body,param} = require('express-validator');
const db = require("../Models");
const UserSimPlan = db.UserSimPlan;
const Delivery = db.Delivery;


exports.rule = (type) => {

    let rules = [];
    switch (type) {

        case "update":
            rules = [
                param('id').isNumeric().exists().custom(value => {
                    return Delivery.findByPk(value).then(data => {
                        if (!data) return Promise.reject('Delivery not found');
                    })
                }),
                body('firstName').optional().isLength({min: 1, max: 255}).isString(),
                body('lastName').optional().isLength({min: 1, max: 255}).isString(),
                body('city').isString().optional(),
                body('country').isString().optional(),
                body('street').isString().optional(),
                body('apartment').isString().optional(),
                body('zip').matches(/(^\d{5}$)|(^\d{5}-\d{4}$)/, "i").optional(),
                body('deliveryType').isIn(["site", "offline"]).optional(),
                body('deliveryId').isString().optional(),
            ];
            break;

        case "create":
            rules = [
                body('firstName').exists().isLength({min: 1, max: 255}).isString(),
                body('lastName').exists().isLength({min: 1, max: 255}).isString(),
                body('city').isString().exists(),
                body('country').isString().exists(),
                body('street').isString().exists(),
                body('apartment').isString().exists(),
                body('zip').matches(/(^\d{5}$)|(^\d{5}-\d{4}$)/, "i").exists(),
                body('deliveryType').isIn(["site", "offline"]).optional(),
                body('deliveryId').isString().optional(),
                body('productId').isNumeric().exists().custom(value => {
                    return UserSimPlan.findByPk(value).then(data => {
                        if (!data) return Promise.reject('Product not found');
                    })
                })
            ];
            break;
    }

    return rules;
}