const db = require("../../Models/index");
const stripe = require("../Payment/stripe");
const StripPay = db.StripPay;
const UserPay = db.UserPay;
const User = db.User;

class PaymentServices {
    async createPayment(userPay, type = "stripe") {
        switch (type) {
            case "stripe":
                const user = await User.findByPk(userPay.userId);
                let stripeCustomerId;
                if(!user.stripeCustomerId) {
                    const stripeCustomer = await stripe.createCustomer({
                        name: `${user.firstName} ${user.lastName}`,
                        email: user.email
                    });
                    if(stripeCustomer) {
                        stripeCustomerId = stripeCustomer.id;
                        await User.update({
                            stripeCustomerId: stripeCustomer.id
                        }, {
                            where: {id: user.id}
                        });
                    }
                } else {
                    stripeCustomerId = user.stripeCustomerId;
                }
                const intent = await stripe.createPaymentIntent(userPay.sum, userPay.doCaptureLater, stripeCustomerId);
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
                if(userPay.doCaptureLater && status === 'requires_capture') {
                    payStatus = true;
                } else {
                    payStatus = status === 'succeeded';
                }
                break;
            default:
                throw new Error("Invalid payment system");
        }

        return (payStatus) ? await UserPay.update({status: 'paid'}, {where: {id: userPay.id}}) : null;
    }

    async capturePayment(userPay) {
        let payStatus = false;
        switch (userPay.paymentType) {
            case "stripe":
                const stripPay = await StripPay.findOne({where: {userPayId: userPay.id}});
                const status = await stripe.capturePaymentIntent(stripPay.idStrip);
                payStatus = status === 'succeeded';
                break;
            default:
                throw new Error("Invalid payment system");
        }

        return payStatus;
    }

    async makeRecurrencePayment(userPay, type = "stripe") {
        switch (type) {
            case "stripe":
                const status = await stripe.makeRecurrencePayment(userPay.sum, userPay.stripeCustomerId);
                return status === 'succeeded';
            default:
                throw new Error("Invalid payment system");
        }
    }
}

module.exports = {
    PaymentServices,
    paymentServices: new PaymentServices()
};
