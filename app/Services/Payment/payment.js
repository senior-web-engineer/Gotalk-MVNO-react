const db = require("../../Models/index");
const stripe = require("../Payment/stripe");
const StripPay = db.StripPay;
const UserPay = db.UserPay;


class PaymentServices {
    async createPayment(userPay, type = "stripe") {
        switch (type) {
            case "stripe":
                const intent = await stripe.createPaymentIntent(userPay.sum);
                await StripPay.create({idStrip: intent.id, userPayId: userPay.id, payToken:intent.client_secret});
                return intent;
            default:
                throw new Error("Invalid payment system");
        }
    }

    async changePaymentStatus(userPay) {
        let payStatus = false;
        switch (userPay.paymentType) {
            case "stripe":
                const stripPay = await StripPay.findOne({where: {userPayId: userPay.id}});
                const status = await stripe.getPaymentIntentStatus(stripPay.idStrip);
                payStatus = status === 'succeeded';
                break;
            default:
                throw new Error("Invalid payment system");
        }

        return (payStatus) ? await UserPay.update({status: 'paid'}, {where: {id: userPay.id}}) : null;
    }
}

module.exports = {
    PaymentServices,
    paymentServices: new PaymentServices()
};