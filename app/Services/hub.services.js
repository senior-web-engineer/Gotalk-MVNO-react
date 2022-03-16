const {MailerServices} = require("./mailer.services");
const {UserServices} = require("./user.services");
const {DeliveryServices} = require("./delivery.services");
const {AuthServices} = require("./auth.services");
const {PaymentServices} = require("./Payment/payment");

module.exports = {
    mailer: new MailerServices(),
    userServices: new UserServices(),
    deliveryServices: new DeliveryServices(),
    paymentServices: new PaymentServices(),
    auth: new AuthServices()
};