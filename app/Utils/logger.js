const config = require("../../config/logger.config");
const {createLogger, transports} = require('winston');
const S3StreamLogger = require('s3-streamlogger').S3StreamLogger;
const db = require("../Models/index");
const WinstonTransportSequelize = require("../Utils/winstonTransportSequelize");
const Sequelize = require('sequelize');

const s3LogEnabled = false;

function giveTransportList(type) {
    let s3Config = {};
    let logType = '';
    switch (type) {
        case 'main':
            s3Config = config.s3.main;
            logType = "logMain";
            break;

        case 'pay':
            s3Config = config.s3.pay;
            logType = "logPay";
            break;

        case 'req':
            s3Config = config.s3.plintron.reqS3;
            logType = "logPlintronRequest";
            break;

        case 'res':
            s3Config = config.s3.plintron.resS3;
            logType = "logPlintronResponse";
            break;

        case 'error':
            s3Config = config.s3.plintron.errorS3;
            logType = "logPlintronError";
            break;

        case 'cron':
            s3Config = config.s3.plintron.cronS3;
            logType = "logPlintronCron";
            break;

        case 'notify':
            s3Config = config.s3.plintron.notifyS3;
            logType = "logPlintronNotify";
            break;

        case 'importSim':
            s3Config = config.s3.plintron.importSimS3;
            logType = "logPlintronImportSim";
            break;
    }

    const transportList = [
        new transports.Console(config.options.console),
        new WinstonTransportSequelize({
            sequelize: db.sequelize, // sequelize instance [required]
            meta: { project: logType }, // meta object defaults
            fields: { meta: Sequelize.JSONB }, // merge model fields
            modelOptions: { timestamps: false }, // merge model options
            logType: logType,
            level: 'info'
        })
    ];
    if(config.s3.main.access_key_id && s3LogEnabled) {
        transportList.push(new (transports.Stream)({stream: new S3StreamLogger(s3Config)}));
    }
    return transportList;
}

const logger = new createLogger({
    transports: giveTransportList('main'),
    exitOnError: false,
});

logger.stream = {
    write: function (message, encoding) {
        logger.info(message);
    },
};

// Pay Logger
const cronPay = new createLogger({
    transports: giveTransportList('pay')
});

// Plintron Logger
const reqPlintron = new createLogger({
    transports: giveTransportList('req')
});

const resPlintron = new createLogger({
    transports: giveTransportList('res')
});

const errorPlintron = new createLogger({
    transports: giveTransportList('error')
});

const cronPlintron = new createLogger({
    transports: giveTransportList('cron')
});

const notifyPlintron = new createLogger({
    transports: giveTransportList('notify')
});

const importSimPlintron = new createLogger({
    transports: giveTransportList('importSim')
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









