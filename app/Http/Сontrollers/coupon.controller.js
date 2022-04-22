const {MainController} = require("./main.controller");
const db = require("../../Models/index");
const {getPagination, queueConstructor, getPagingData} = require("../../Utils/dbHelpers");
const Coupon = db.Coupon;
const Plan = db.Plan;

class CouponController extends MainController {

    constructor() {
        super(Coupon);
    }

    findAll = async (req, res) => {
        try {
            const {limit, offset, page} = getPagination(req.query.page, req.query.per_page);
            let options = queueConstructor(req, res, {
                limit, offset, order: [['id', 'DESC']],
                include: [{ model: Plan, as: 'plan', }]
            }, Coupon);
            return this.successRes(res, getPagingData(await Coupon.findAndCountAll(options), page, limit))
        } catch (e) {
            return this.errorRes(res, e);
        }
    };

    findOne = async (req, res) => {
        try {
            let options = queueConstructor(req, res, {
                where: {id: req.params.id},
                include: [{ model: Plan, as: 'plan', }]
            }, Coupon);
            return this.successRes(res, await Coupon.findOne(options))
        } catch (e) {
            return this.errorRes(res, e);
        }
    };

    canUseCoupon = async (req, res) => {
        try {
            const {code, planIds} = req.query;
            let coupon;
            for(let planId of planIds) {
                coupon = await Coupon.findOne({
                    where: {
                        code, planId,
                        isActive: true
                    }
                });
                if(coupon) {
                    break;
                }
            }
            return this.successRes(res, coupon);
        }
        catch (e) {
            return this.errorRes(res, e);
        }
    }
}

module.exports = {
    CouponController
};
