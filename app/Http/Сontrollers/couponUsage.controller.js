const {MainController} = require("./main.controller");
const db = require("../../Models/index");
const {getPagination, queueConstructor, getPagingData} = require("../../Utils/dbHelpers");
const CouponUsage = db.CouponUsage;
const Coupon = db.Coupon;
const User = db.User;

class CouponUsageController extends MainController {

    constructor() {
        super(CouponUsage);
    }

    findAll = async (req, res) => {
        try {
            const {limit, offset, page} = getPagination(req.query.page, req.query.per_page);
            let options = queueConstructor(req, res, {
                limit, offset, order: [['id', 'DESC']],
                include: [
                    { model: User, as: 'User', },
                    { model: Coupon, as: 'Coupon', }
                ]
            }, CouponUsage);
            return this.successRes(res, getPagingData(await CouponUsage.findAndCountAll(options), page, limit))
        } catch (e) {
            return this.errorRes(res, e);
        }
    };

    findOne = async (req, res) => {
        try {
            let options = queueConstructor(req, res, {
                where: {id: req.params.id},
                include: [
                    { model: User, as: 'User', },
                    { model: Coupon, as: 'Coupon', }
                ]
            }, CouponUsage);
            return this.successRes(res, await CouponUsage.findOne(options))
        } catch (e) {
            return this.errorRes(res, e);
        }
    };

    findAllByCouponId = async (req, res) => {
        try {
            const {limit, offset, page} = getPagination(req.query.page, req.query.per_page);
            let options = queueConstructor(req, res, {
                limit, offset, order: [['id', 'DESC']],
                include: [
                    { model: User, as: 'User', },
                    { model: Coupon, as: 'Coupon', }
                ],
                where: {
                    couponId: req.params.id
                }
            }, CouponUsage);
            return this.successRes(res, getPagingData(await CouponUsage.findAndCountAll(options), page, limit))
        } catch (e) {
            return this.errorRes(res, e);
        }
    };
}

module.exports = {
    CouponUsageController
};
