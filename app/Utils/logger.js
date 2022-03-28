const config = require("../../config/logger.config");
const {createLogger, transports} = require('winston');
var S3StreamLogger = require('s3-streamlogger').S3StreamLogger;

const s3LogEnabled = true;

// simple Logger
const logger = new createLogger({
    transports: [
        new transports.Console(config.options.console),
        (config.s3.main.access_key_id && s3LogEnabled) ?
            new (transports.Stream)({stream: new S3StreamLogger(config.s3.main)}) :
            new transports.File(config.options.file)

    ],
    exitOnError: false,
});

logger.stream = {
    write: function (message, encoding) {
        logger.info(message);
    },
};

// Pay Logger
const cronPay = new createLogger({
    transports: [
        new transports.Console(config.options.console),
        (config.s3.pay.access_key_id && s3LogEnabled) ?
            new (transports.Stream)({stream: new S3StreamLogger(config.s3.pay)}) :
            new (transports.File)(config.payOptions.fileCron),

    ]
});


// Plintron Logger
const reqPlintron = new createLogger({
    transports: [
        new transports.Console(config.options.console),
        (config.s3.plintron.reqS3.access_key_id && s3LogEnabled) ?
            new (transports.Stream)({stream: new S3StreamLogger(config.s3.plintron.reqS3)}) :
            new (transports.File)(config.plintronOptions.fileReq)
    ]
});

const resPlintron = new createLogger({
    transports: [
        new transports.Console(config.options.console),
        (config.s3.plintron.resS3.access_key_id && s3LogEnabled) ?
            new (transports.Stream)({stream: new S3StreamLogger(config.s3.plintron.resS3)}) :
            new (transports.File)(config.plintronOptions.fileRes)

    ]
});

const errorPlintron = new createLogger({
    transports: [
        new transports.Console(config.options.console),
        (config.s3.plintron.errorS3.access_key_id && s3LogEnabled) ?
            new (transports.Stream)({stream: new S3StreamLogger(config.s3.plintron.errorS3)}) :
            new (transports.File)(config.plintronOptions.fileError),

    ]
});

const cronPlintron = new createLogger({
    transports: [
        new transports.Console(config.options.console),
        (config.s3.plintron.cronS3.access_key_id && s3LogEnabled) ?
            new (transports.Stream)({stream: new S3StreamLogger(config.s3.plintron.cronS3)}) :
            new (transports.File)(config.plintronOptions.fileCron)

    ]
});

const notifyPlintron = new createLogger({
    transports: [
        new transports.Console(config.options.console),
        (config.s3.plintron.notifyS3.access_key_id && s3LogEnabled) ?
            new (transports.Stream)({stream: new S3StreamLogger(config.s3.plintron.notifyS3)}) :
            new (transports.File)(config.plintronOptions.fileNotify),

    ]
});

const importSimPlintron = new createLogger({
    transports: [
        new transports.Console(config.options.console),
        (config.s3.plintron.importSimS3.access_key_id && s3LogEnabled) ?
            new (transports.Stream)({stream: new S3StreamLogger(config.s3.plintron.importSimS3)}) :
            new (transports.File)(config.plintronOptions.importSim),
    ]
});

const payLogger = {
    cron: function (msg) {
        cronPay.info(msg);
    },
    cronErr: function (msg) {
        cronPay.error(msg);
    },
    log: function (level, msg) {
        const lvl = payLogger[level];
        lvl(msg);
    }
};

const plintronLogger = {
    req: function (msg) {
        reqPlintron.info(msg);
    },
    res: function (msg) {
        resPlintron.info(msg);
    },
    error: function (msg) {
        errorPlintron.error(`${typeof msg === "string" ? msg : JSON.stringify(msg)}; Stack=${new Error().stack}`);
    },
    cron: function (msg) {
        cronPlintron.info(msg);
    },
    importSimInfo: function (msg) {
        importSimPlintron.info(msg);
    },
    importSimErr: function (msg) {
        importSimPlintron.error(`${typeof msg === "string" ? msg : JSON.stringify(msg)}; Stack=${new Error().stack}`);
    },
    notify: function (msg) {
        notifyPlintron.info(msg);
    },
    notifyErr: function (msg) {
        notifyPlintron.error(`${typeof msg === "string" ? msg : JSON.stringify(msg)}; Stack=${new Error().stack}`);
    },
    log: function (level, msg) {
        const lvl = plintronLogger[level];
        lvl(msg);
    }
};

module.exports = {
    logger,
    plintronLogger,
    payLogger
};









