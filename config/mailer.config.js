const key = require('../resources/privateKey/mail-key.json');

module.exports = {
    host: process.env.MAIL_HOST ||  "smtp.googlemail.com",
    port: process.env.MAIL_PORT ||  465,
    secure: true,
    auth: {
        type: 'OAuth2',
        user: process.env.MAIL_FROM_ADDRESS,
        serviceClient: key.client_id,
        privateKey: key.private_key
    },
    from: process.env.MAIL_FROM_ADDRESS,
    emailDebug: process.env.EMAIL_DEBUG || true,
};