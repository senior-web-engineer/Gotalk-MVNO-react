const fs = require("fs");
const fse = require('fs-extra')
const {plintron, app} = require("../../../../config/index.config");
const {plintronLogger} = require("../../../Utils/logger");
const db = require("../../../Models/index");
const {mailerServices} = require("../../../Services/mailer.services");
const {PlintronClient} = require("../Utils/plintronClient");
const {PlintronError} = require("../../../Exceptions/plintronError");
const PlintronSim = db.PlintronSim;

module.exports.import = async function () {
    try {
        plintronLogger.importSimInfo("---------- Import sim started ----------");
        const newSimCardsFolder = plintron.simStorage.newSimFolder;
        const processedSimCardsFolder = plintron.simStorage.processedSimFolder;
        const files = fs.readdirSync(newSimCardsFolder);
        plintronLogger.importSimInfo(files);
        for (const file of files) {
            if (file === '.gitignore') continue;
            await saveSim(getJSONFileData(newSimCardsFolder + file))
            fse.moveSync(newSimCardsFolder + file, processedSimCardsFolder + file);
        }
    } catch (e) {
        plintronLogger.importSimErr(e.message);
    }
    plintronLogger.importSimInfo("---------- Import sim finished ----------");
}

function getJSONFileData(filename) {
    try {
        return fs
            .readFileSync(filename, 'utf-8')
            .split('\n')
            .filter(Boolean);
    } catch (e) {
        plintronLogger.importSimErr('Error reading file with sim cards err: '.concat(e.message));
        return [];
    }
}

async function saveSim(events) {

    let message = null;

    for (const event of events) {
        try {
            const sim = event.replace(/[\n\r]/g, '').split(",");
            if (!sim[0] || !sim[1] || !sim[2] || !sim[3] || !sim[4] || !sim[5]) {
                plintronLogger.error('Error parse sim string');
                continue;
            }

            if (await PlintronSim.findOne({where:{ICCID:sim[0]}})) continue;

            const phoneNumber = await getMsisdn(sim[0]);

            if (phoneNumber.length === 10) {
                message+= ` ${phoneNumber}`;
                continue;
            }

            await PlintronSim.create({
                ICCID: sim[0], PINOne: sim[1], PUKOne: sim[2],
                PINTwo: sim[3], PUKTwo: sim[4], IMSI: sim[5],
                MSISDN: phoneNumber, sum: 0
            });
        } catch (e) {
            plintronLogger.importSimErr('Error save sim: '.concat(e.message));
        }
    }

    if (message)
        mailerServices.sender(app.defaultEmail, `MSISDN ${message} one is already in use`, "Error sim", "admin/importSimCardError");

}

async function getMsisdn(icc_id) {
    try {
        const req = {icc_id};
        const result = await PlintronClient.req(req, 'GET_ACCOUNT_DETAILS');
        return result?.get_account_details_response?.msisdn;
    } catch (e) {
        throw new PlintronError(e.code, e.message);
    }
}