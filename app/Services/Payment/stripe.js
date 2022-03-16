const stripe = require('stripe')(process.env.STRIPE_SK);

exports.createPaymentIntent = async (sum) => {
    return await stripe.paymentIntents.create({
        amount: sum * 100,
        currency: 'usd',
        payment_method_types: ['card'],
    });
};

exports.getPaymentIntentStatus = async (idStrip) => {
    const intent = await stripe.paymentIntents.retrieve(idStrip);
    return intent.status;
}