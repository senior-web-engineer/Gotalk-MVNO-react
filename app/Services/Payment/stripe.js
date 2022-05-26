const {plintronLogger} = require("../../Utils/logger");
const stripe = require('stripe')(process.env.STRIPE_SK);

exports.createPaymentIntent = async (sum, doCaptureLater = false, stripeCustomerId = null) => {
    plintronLogger.error({
        amount: sum * 100,
        currency: 'usd',
        payment_method_types: ['card'],
        capture_method: doCaptureLater ? "manual" : "",
        customer: stripeCustomerId
    });
    return await stripe.paymentIntents.create({
        amount: sum * 100,
        currency: 'usd',
        payment_method_types: ['card'],
        capture_method: doCaptureLater ? "manual" : "",
        customer: stripeCustomerId
    });
};

exports.getPaymentIntentStatus = async (idStrip) => {
    const intent = await stripe.paymentIntents.retrieve(idStrip);
    return intent.status;
}

exports.capturePaymentIntent = async (idStrip) => {
    let intent;
    try {
        intent = await stripe.paymentIntents.capture(idStrip);
    }
    catch (ex) {
        if(ex?.raw?.payment_intent) {
            intent = ex.raw.payment_intent;
        } else {
            plintronLogger.error(ex.message);
        }
    }
    return intent?.status;
}

exports.createCustomer = async ({name, email}) => {
    return await stripe.customers.create({
        name, email
    });
}

exports.makeRecurrencePayment = async (sum, stripeCustomerId) => {
    const paymentMethods = await stripe.paymentMethods.list({
        customer: stripeCustomerId,
        type: 'card',
    });
    const intent = await stripe.paymentIntents.create({
        amount: sum * 100,
        currency: 'usd',
        customer: stripeCustomerId,
        payment_method: paymentMethods[0].id,
        off_session: true,
        confirm: true,
    });
    return intent.status;
}

exports.setupIntent = async ({customerId}) => {
    return await stripe.setupIntents.create({
        customer: customerId,
        payment_method_types: ['card'],
    });
}
