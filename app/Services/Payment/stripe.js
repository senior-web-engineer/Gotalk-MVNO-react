const stripe = require('stripe')(process.env.STRIPE_SK);

exports.createPaymentIntent = async (sum, doCaptureLater = false) => {
    return await stripe.paymentIntents.create({
        amount: sum * 100,
        currency: 'usd',
        payment_method_types: ['card'],
        capture_method: doCaptureLater ? "manual" : ""
    });
};

exports.getPaymentIntentStatus = async (idStrip) => {
    const intent = await stripe.paymentIntents.retrieve(idStrip);
    return intent.status;
}

exports.capturePaymentIntent = async (idStrip) => {
    const intent = await stripe.paymentIntents.capture(idStrip);
    return intent.status;
}
