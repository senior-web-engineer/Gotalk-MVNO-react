const config = require("../../../config/app.config");
const winston = require('../../Utils/logger');

module.exports = (error, req, res, next) => {
    if(!error) return next();

    winston.logger.error(`${error.status || 500} - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

    return res.status(error.status || 500).json({
        status: error.status,
        message: error.message,
        stack: (Boolean(config.debug))? error.stack : ''
    })
}