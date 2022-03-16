const appRoot = require('app-root-path');
const fs = require("fs");

module.exports = {
    url: process.env.PLINTRON_URL || "http://localhost:8888/",
    entity: process.env.ENTITY || 'GOTALK',
    simStorage: {
        newSimFolder: appRoot.path.concat('/resources/temp/sim/new/'),
        processedSimFolder: appRoot.path.concat('/resources/temp/sim/processed/')
    },
    qr: {
        url: process.env.PLINTRON_QR_URL || "htts://localhost:8889/",
        entity: process.env.PLINTRON_QR_ENTITY || 'gotalk',
        access_key: process.env.PLINTRON_QR_ACCESS_KEY || "1234"
    },
    sftpStatistics: {
        host: process.env.PLINTRON_STATISTIC_HOST,
        port: process.env.PLINTRON_STATISTIC_PORT || 22,
        username: process.env.PLINTRON_STATISTIC_USERNAME,
        password: process.env.PLINTRON_STATISTIC_PASSWORD,
        //privateKey:  fs.readFileSync(appRoot.path.concat('/resources/temp/privateKey/GoTalk-Dev.pem')),
        statistics: [
            {
                filePath: process.env.PLINTRON_STATISTIC_MIN_PATH || '/var/www/backend/resources/temp/statistics/min/',
                imsiNum: 9,
                valueNum: 34,
                type: 'min',
                // history
                dialedNumber: 7,
                freeMinutesAccountBalance: 34,
                intialFreeUnits: 58,
                callDate: 29,
                callTerminationTime: 30,
                callType: 2
            },
            {
                filePath: process.env.PLINTRON_STATISTIC_SMS_PATH || '/var/www/backend/resources/temp/statistics/sms/',
                imsiNum: 7,
                valueNum: 22,
                type: 'sms',
                // history
                dialedNumber: 6,
                intialFreeUnits: 37,
                freeSMSAccountBalance: 22,
                msgDate: 35,
                callType: 2
            },
            {
                filePath: process.env.PLINTRON_STATISTIC_INTERNET_PATH || '/var/www/backend/resources/temp/statistics/internet/',
                imsiNum: 10,
                valueNum: 36,
                type: 'internet',
            }
        ],
    },
    codeList: [
        {code: 0, desc: 'Success'},
        {code: 999, desc: 'Internal error'},
        {code: 9000, desc: 'Subscriber not found'},
        {code: 9001, desc: 'Temporary error'},
        {code: 9101, desc: 'WORK_LOAD'},
        {code: 9102, desc: 'NETWRK_SP_NOT_READY'},
        {code: 9103, desc: 'END_USER_NOT_READY'},
        {code: 9104, desc: 'FRM_TMIE_NOT_MET'},
        {code: 9105, desc: 'REQ_DATE_LESS_PUB_INT'},
        {code: 9106, desc: 'DATE_AND_TIME_NOT_MET'},
        {code: 9107, desc: 'OTHER_REASON'},
        {code: 9108, desc: 'MDN_NOT_FOUND'},
        {code: 9109, desc: 'CUST_INFO_NO_MATCH'},
        {code: 9110, desc: 'MDN_NOT_ACTIVE'},
        {code: 9111, desc: 'DUE_DATE_NO_MATCH'},
        {code: 9112, desc: 'PORT_COMPLEXITY'},
        {code: 9113, desc: 'SYSTEM_OUTAGES'},
        {code: 9114, desc: 'HIGH_VOL'},
        {code: 9115, desc: 'SAME_NEW_OLD_NET_SP'},
        {code: 9116, desc: 'ILLEGIBLE_FAX'},
        {code: 9117, desc: 'OUT_OF_SEQUENCE'},
        {code: 9118, desc: 'ADMIN_NUMBER_NOT_PORTABLE'},
        {code: 9119, desc: 'REQ_REC_OUTSIDE_OF_BUS_HRS'},
        {code: 9120, desc: 'PORT_REQ_PEND_ANOTHER_LOC_PROV'},
        {code: 9121, desc: 'PORT_REQ_PEND_DUPLICATE_REQ'},
        {code: 9122, desc: 'MDN_HAS_SRV_PROV_PORT_PROTECT'},
        {code: 9123, desc: 'CARR_CANT_PROC_MULTI_LINE_REQ'},
        {code: 9124, desc: 'ACCOUNT_NUM_REQ_OR_INCORRECT'},
        {code: 9125, desc: 'SSN_TAX_ID_REQ_OR_INCORRECT'},
        {code: 9126, desc: 'PASS_PIN_REQ_OR_INCORREC'},
        {code: 9127, desc: 'ZIP_CODE_REQ_OR_INCORRECT'},
        {code: 9128, desc: 'FIRST_NAME_REQ_OR_INCORRECT'},
        {code: 9129, desc: 'LAST_NAME_REQ_OR_INCORRECT'},
        {code: 9130, desc: 'BUSINESS_NAME_REQ_OR_INCORRECT'},
        {code: 9131, desc: 'PREPAY_MDN'}
    ]
};