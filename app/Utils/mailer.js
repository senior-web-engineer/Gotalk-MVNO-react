const nodemailer = require("nodemailer");
const config = require("../../config/mailer.config");
const winston = require("../Utils/logger");

const transporter = nodemailer.createTransport({
        host: config.host,
        port: config.port,
        secure: config.secure,
        auth: config.auth
    },
    {
        from: config.from,
    });

const mailer = async message => {
    try {
        await transporter.verify();
        await transporter.sendMail(message);
    } catch (e) {
        winston.logger.error(e);
    }
};

module.exports = mailer;