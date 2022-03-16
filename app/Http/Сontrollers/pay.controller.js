const {MainController} = require("./main.controller");
const db = require("../../Models/index");
const {paymentServices} = require("../../Services/hub.services");
const {errCheckerPlintron} = require("../../Exceptions/plintronError");
const UserPay = db.UserPay;
const User = db.User;

class PayController extends MainController {

    constructor() {
        super(UserPay);
    }

    refillBalance = async (req, res) => {
        let userPay;
        try {
            const {user} = req;
            const body = req.body;
            const sum = Number(body.sum);
            this.errChecker(sum <= 0, "Minimum deposit amount 1$");

            userPay = await UserPay.create({
                action: "replenishment_balance",
                sum: sum,
                type: "balance",
                userId: user.id,
                paymentType: 'stripe'
            });
            const intent = await paymentServices.createPayment(userPay);
            return this.successRes(res,{stripId: intent.client_secret, payId: userPay.id});
        } catch (e) {
            if (userPay) await userPay.destroy();
            return this.errorRes(res, e);
        }
    };

    verifyRefillBalance = async (req, res) => {
        try {
            let userPay = await UserPay.findByPk(req.params.id);
            errCheckerPlintron(userPay.status === 'paid', 'Payment already confirmed');
            const paymentStatus = await paymentServices.changePaymentStatus(userPay);
            errCheckerPlintron(!paymentStatus, 'Payment not confirmed');
            const user = await User.findByPk(userPay.userId);
            await User.update({balance: Number(userPay.sum) + Number(user.balance)}, {where: {id: userPay.userId}})
            return this.successRes(res, {message: 'Payment confirmed'});
        } catch (e) {
            return this.errorRes(res, e);
        }
    };
}

module.exports = {
    PayController
};