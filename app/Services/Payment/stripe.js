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

exports.createCustomer = async ({name, email, paymentIntentId}) => {
    const intent = await stripe.paymentIntents.retrieve(paymentIntentId);
    return await stripe.customers.create({
        name, email, payment_method: intent?.payment_method
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
