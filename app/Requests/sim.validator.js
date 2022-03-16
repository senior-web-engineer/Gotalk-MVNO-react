const {body} = require('express-validator');
const db = require("../Models");
const PlintronSim = db.PlintronSim;

exports.rule = (type) => {

    switch (type) {
        case "changeStatus":
            return [
                body('status').isIn(['A', 'B', 'T']).exists(),
                body('productId').isInt().exists(),
                body('userId').isInt().exists()
            ];
        case "changeSim":
            return [
                body('productId').isInt().exists(),
            ];
        case "changeSimOwner":
            return [
                body('productId').isInt().optional(),
                body('simId').isInt().optional(),
                body('newSimId').isInt().optional(),
                body('simType').optional().isIn(["esim", "physical"]),
                body('userId').isInt().optional(),
                body('delivery').isObject().optional(),
            ];
        case "switchingAnotherOperator":
            return [
                body('pmsisdn').isInt().exists(),
                body('ICCID').isString().optional(),
                body('productId').isInt().exists(),
                body('osp_account_number').isString().exists(),
                body('osp_account_password').isString().exists(),
                body('name').isString().exists(),
                body('address_line').isString().exists(),
                body('state').isString().isLength({min: 1, max: 3}).exists(),
                body('city').isString().exists(),
                body('zip').matches(/(^\d{5}$)|(^\d{5}-\d{4}$)/, "i").optional(),
                body('zip_code').matches(/(^\d{5}$)|(^\d{5}-\d{4}$)/, "i").optional()
            ];
        case "create":
            return [
                body('type').isIn(['esim', 'physical']).exists(),
                body('ICCID').isString().exists().custom(value => {
                    return PlintronSim.findOne({where: {ICCID: value}}).then(data => {
                        if (data) return Promise.reject('ICCID already in use');
                    })
                }),
                body('PINOne').isString().exists(),
                body('PUKOne').isString().exists(),
                body('PINTwo').isString().exists(),
                body('PUKTwo').isString().exists(),
            ];
        case "createPhysical":
            return [
                body('sim.ICCID').isString().exists().custom(value => {
                    return PlintronSim.findOne({where: {ICCID: value}}).then(data => {
                        if (data) return Promise.reject('ICCID already in use');
                    })
                }),
                body('sim.PINOne').isString().exists(),
                body('sim.PUKOne').isString().exists(),
                body('sim.PINTwo').isString().exists(),
                body('sim.PUKTwo').isString().exists(),
            ];
        case "update":
            return [
                body('type').isIn(['esim', 'physical']).optional(),
                body('ICCID').isString().exists(),
                body('PINOne').isString().optional(),
                body('PUKOne').isString().optional(),
                body('PINTwo').isString().optional(),
                body('PUKTwo').isString().optional(),
            ];
    }
}