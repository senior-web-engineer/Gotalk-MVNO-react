const db = require("../../Models/index");
const {simCardClass} = require("../../Services/Plintron/simCard");
const {userServices, paymentServices, auth} = require("../../Services/hub.services");
const UserPay = db.UserPay;
const StripPay = db.StripPay;

class BasketController {

    buy = async (req, res) => {
        let userPay,token;
        try {
            let {user} = req;
            let body = req.body;
            user = await userServices.getUser(body.user, user);
            const products = await simCardClass.buySim(body, user.id);
            if (products.productIds.length === 0)
                return res.status(400).json({payload: {errors: products.info}});

            userPay = await UserPay.create({
                action: "bySimCard", sum: products.sum, userId: user.id,
                productId: products.productIds, paymentType: 'stripe',
                discountAmount: products.discountAmount,
                couponId: products.couponId,
                doCaptureLater: products.doCaptureLater
            });
            const intent = await paymentServices.createPayment(userPay);
            if (body.user) token = await auth.token(user);

            return res.json({
                payload: {
                    stripId: intent.client_secret,
                    payId: userPay.id,
                    info: products.info,
                    token: token,
                    resultSum: products.sum
                }
            });
        } catch (e) {
            if (userPay) await userPay.destroy();
            return res.status(500).json({code: e.code || 0, message: e.message || "Error"});
        }
    };

    checkBuy = async (req, res) => {
        let body = req.body;
        try {
            await simCardClass.checkBuySim(body.payId);
            return res.json({payload: {message: "Purchase confirmed"}});
        } catch (e) {
            return res.status(500).json({code: e.code || 0, message: e.message || "Error"});
        }
    };

    repeatBuy = async (req, res) => {
        let body = req.body;
        try {
            let userPay = await UserPay.findByPk(body.payId);
            if (!userPay) throw new Error('Payment not found');
            if (userPay.status === 'paid') return res.json({payload: {message: "Purchase confirmed, check payment"}});
            switch (userPay.paymentType) {
                case "stripe":
                    let stripPay = await StripPay.findOne({where: {userPayId: userPay.id}});
                    return res.json({
                        payload: {
                            stripId: stripPay.payToken,
                            payId: userPay.id,
                            resultSum: userPay.sum
                        }
                    });
                default:
                    throw new Error("Invalid payment system");
            }
        } catch (e) {
            return res.status(500).json({code: e.code || 0, message: e.message || "Error"});
        }
    };

}

module.exports = {
    BasketController
};
