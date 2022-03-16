const appRoot = require('app-root-path');
const {format} = require('winston');

const dirName = `${appRoot}/storage/logs/`;
const plintronLogFolder = `plintron/`;
const payLogFolder = `pay/`;

const {printf} = format;
const myFormat = printf( ({ level, message, timestamp , ...metadata}) => {
    let msg = `${new Date().toISOString()} [${level}] : ${JSON.stringify(message, null, 4)}\n`
    if(metadata) {
        msg += JSON.stringify(metadata)
    }
    return msg
});

const file = {
    handleExceptions: true,
    json: true,
    maxsize: 5242880 * 2,
    maxFiles: 10,
    colorize: true,
    format: format.combine(myFormat)
   // zippedArchive: true,
};

const s3 = {
    bucket: process.env.S3_BUCKET,
    access_key_id: process.env.S3_ACCESS_KEY_ID,
    secret_access_key: process.env.S3_SECRET_ACCESS_KEY,
};

module.exports = {
    options: {
        file: {
            ...file,
            level: 'info',
            filename: dirName.concat('app.log'),
        },
        console: {
            level: 'debug',
            handleExceptions: true,
            json: false,
            colorize: true,
            format: format.combine(format.colorize(), myFormat)
        },

    },
    s3:{
        main:{
            ...s3,
            folder: `logs/app.log`,
        },
        pay:{
            ...s3,
            folder: `logs/pay/logs.log`,
        },
        plintron:{
            reqS3: {
                ...s3,
                folder: `logs/plintron/req.log`
            },
            resS3: {
                ...s3,
                folder: `logs/plintron/res.log`
            },
            errorS3: {
                ...s3,
                folder: `logs/plintron/error.log`
            },
            cronS3: {
                ...s3,
                folder: `logs/plintron/cron.log`
            },
            notifyS3: {
                ...s3,
                folder: `logs/plintron/notify.log`
            },
            importSimS3: {
                ...s3,
                folder: `logs/plintron/import_sim.log`
            }
        }
    },
    payOptions: {
        fileCron: {
            ...file,
            level: 'info',
            filename: dirName.concat(payLogFolder,'cron.log'),
        },
    },
    plintronOptions: {
        fileReq: {
            ...file,
            level: 'info',
            filename: dirName.concat(plintronLogFolder,'req.log'),
        },
        fileRes: {
            ...file,
            level: 'debug',
            filename: dirName.concat(plintronLogFolder,'res.log'),
        },
        fileError: {
            ...file,
            level: 'error',
            filename: dirName.concat(plintronLogFolder,'error.log'),
        },
        fileCron: {
            ...file,
            level: 'info',
            filename: dirName.concat(plintronLogFolder,'cron.log'),
        },
        fileNotify: {
            ...file,
            level: 'info',
            filename: dirName.concat(plintronLogFolder,'notify.log'),
        },
        importSim: {
            ...file,
            level: 'info',
            filename: dirName.concat(plintronLogFolder,'import_sim.log'),
        }
    }
};