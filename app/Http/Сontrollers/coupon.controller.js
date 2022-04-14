const {MainController} = require("./main.controller");
const db = require("../../Models/index");
const Coupon = db.Coupon;

class CouponController extends MainController {

    constructor() {
        super(Coupon);
    }

    canUseCoupon = async (req, res) => {
        try {
            const {code, planId} = req.query;
            const coupon = await Coupon.findOne({
                where: {
                    code, planId
                }
            });
            return this.successRes(res, coupon?.id > 0);
        }
        catch (e) {
            return this.errorRes(res, e);
        }
    }
}
