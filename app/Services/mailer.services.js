const fs = require("fs");
const ejs = require('ejs');
const mailerServices = require("../Utils/mailer");
const config = require("../../config/index.config");
const winston = require("../Utils/logger");

class MailerServices {

    sender = (email,data = {},subject = '',path) => {
        try {
            const template = fs.readFileSync(`./resources/views/email/${path}.ejs`, 'utf-8');
            const complete = ejs.compile(template);
            const massage = {
                to: config.mailer.emailDebug == "true" ? config.app.defaultEmail : email,
                subject: subject,
                html: complete({data}),
            };
            mailerServices(massage);
        }catch (e) {
            winston.logger.error(e.message);
        }
    };
}

module.exports = {
    MailerServices,
    mailerServices: new MailerServices()
};