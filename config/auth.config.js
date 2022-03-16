module.exports = {
    secret: process.env.APP_SECRET ||  "test-secret",
    tokenLife: process.env.TOKEN_LIFE || 86400
};