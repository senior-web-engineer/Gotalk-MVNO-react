const {PlintronError, errCheckerPlintron} = require("../../../Exceptions/plintronError");
const config = require("../../../../config/index.config");
let Client = require('ssh2-sftp-client');
const {plintronLogger} = require("../../../Utils/logger");
const {groupBy} = require("../../../Utils/groupBy");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const db = require("../../../Models/index");
const {planClass} = require("../plan");
const {PlintronClient} = require("./plintronClient");
const {formatDate, parseDate, msToTime} = require("../../../Utils/timeDate");
const PlintronSim = db.PlintronSim;
const UserSimPlan = db.UserSimPlan;
const PlintronPlan = db.PlintronPlan;
const WholesalePlan = db.WholesalePlan;
const UserSimStatistic = db.UserSimStatistic;
const UserPlanHistory = db.UserPlanHistory;
const PlintronStatistic = db.PlintronStatistic;

class SetOptimalPlan {

    async setOptimalPlan() {
        try {
            plintronLogger.notify("---------- Set Optimal Plan started ----------");
            if (!config.plintron.sftpStatistics.host) {
                plintronLogger.notify('Server configuration is not specified, we cant get statistics');
                return 0;
            }

            try {
               await this.getStatistics();
            } catch (e) {
                plintronLogger.notifyErr(e.message)
            }

            const threeHoursBefore = new Date();
            threeHoursBefore.setHours(new Date().getHours() - 3);
            const plintronStatistics = await PlintronStatistic.findAll({
                //where: {createdAt: {[Op.gte]: threeHoursBefore}}
            })

            const plintronSims = await PlintronSim.findAll({
                where: {IMSI: {[Op.in]: plintronStatistics.map(m => m.IMSI)}},
                include: [
                    {
                        model: UserSimPlan,
                        include: [
                            {model: PlintronPlan},
                            {model: WholesalePlan},
                            {
                                model: UserSimStatistic,
                                order: [['createdAt', 'DESC']],
                            }
                        ],
                    }
                ],
            });

            for (const item of plintronSims) {
                try {

                    plintronLogger.notify(`-------------------- Optimal Plan Data Processing --------------------`);
                    let min = 0, sms = 0, internet = 0;
                    let elements = plintronStatistics.filter(m => m.IMSI === item.IMSI);

                    for (const elem of elements) {
                        switch (elem.type) {
                            case 'sms':
                                sms = (sms === 0 || (sms !== 0 && sms > elem.value)) ? elem.value : sms;
                                break;
                            case 'min':
                                min = (min === 0 || (min !== 0 && min > elem.value)) ? elem.value : min;
                                break;
                            case 'internet':
                                internet = (internet === 0 || (internet !== 0 && internet > elem.value)) ? elem.value : internet;
                                break;
                        }
                    }

                    const internetUsage = await planClass.querySubscriberUsage(item.ICCID);
                    if(internetUsage) {
                        internet = parseFloat(internetUsage.product.usage.remaining.value);
                    }

                    let dbReq = {};

                    plintronLogger.notify(elements);
                    plintronLogger.notify(`Optimize plan data = ${sms}-${min}-${internet}`);

                    if (min > 0) {
                        min = item.UserSimPlan.PlintronPlan.minuteCount - min;
                        dbReq.min = min > 0 ? min : item.UserSimPlan.PlintronPlan.minuteCount;
                    }
                    if (sms > 0) {
                        sms = item.UserSimPlan.PlintronPlan.SMSCount - sms;
                        dbReq.sms = sms > 0 ? sms : item.UserSimPlan.PlintronPlan.SMSCount;
                    }
                    if (internet > 0) {
                        internet = item.UserSimPlan.PlintronPlan.internetCount - internet;
                        dbReq.internet = internet > 0 ? internet : item.UserSimPlan.PlintronPlan.internetCount;
                    }
                    plintronLogger.notify(`Optimize plan data after calculation`);
                    plintronLogger.notify(dbReq);
                    await this.setOptimalPlanItem(item, dbReq);
                } catch (e) {
                    plintronLogger.notifyErr(e.message)
                }
            }
        } catch (e) {
            plintronLogger.notifyErr(e.message)
        }
        plintronLogger.notify("---------- Set Optimal Plan finished ----------");
    }

    async setOptimalPlanItem(plintronSim, dbReq) {
        const userSimStatistic = await this.saveOrUpdateStatistic(plintronSim.UserSimPlan.UserSimStatistics, plintronSim.UserSimPlan.id, dbReq);
        await this.checkWholesalePlanLimit(userSimStatistic, plintronSim);
    }

    async getStatistics() {
        try {
            let data = [];
            let sftp = new Client();

            let clientConfig = {
                host: config.plintron.sftpStatistics.host,
                port: config.plintron.sftpStatistics.port,
                username: config.plintron.sftpStatistics.username,
            };
            config.plintron.sftpStatistics.password ?
                clientConfig.password = config.plintron.sftpStatistics.password :
                clientConfig.privateKey = config.plintron.sftpStatistics.privateKey;

            await sftp.connect(clientConfig);

            for (const elem of config.plintron.sftpStatistics.statistics) {
                data = await this.getGroupStatistic(sftp, elem, data);
            }
            await sftp.end();
            return data;
        } catch (e) {
            plintronLogger.error('-------------- getStatistics error --------------');
            plintronLogger.error(e.message);
            throw new PlintronError(e.code, e.message);
        }
    }

    async getGroupStatistic(sftp, statisticInfo, allData) {
        const fileList = await sftp.list(statisticInfo.filePath);
        for (const fileDetails of fileList) {
            try {
                if (fileDetails.name === "OLD_BACKUP") continue;
                plintronLogger.notify(`---------- File Processing  ${fileDetails.name}  type - ${statisticInfo.type} ----------`);
                const filePath = statisticInfo.filePath + fileDetails.name;
                const stream = await sftp.get(filePath);
                const items = stream.toString("utf-8").split('\n').filter(Boolean)

                for (const item of items) {
                    try {
                        const elem = item.replace(/[\n\r]/g, '').split(",");
                        if (elem[statisticInfo.valueNum] && elem[statisticInfo.imsiNum]) {
                            const value = Number(elem[statisticInfo.valueNum].split('.')[0].replace(/[^+\d]/g, ''));
                            const imsi = elem[statisticInfo.imsiNum].replace(/[^+\d]/g, '');
                            if (imsi && value) {
                                plintronLogger.notify(`imsi=${imsi} value=${value}`);
                                let index = allData.findIndex(el => el.imsi === imsi && el.value >= value && el.type === statisticInfo.type);
                                if (index !== -1) allData[index].value = value;
                                else allData.push({imsi, value, type: statisticInfo.type});
                            }

                            try {
                                await PlintronStatistic.create({
                                    fileName: fileDetails.name,
                                    type: statisticInfo.type,
                                    value: value || null,
                                    IMSI: imsi || null,
                                    data: item
                                });
                            } catch (e) {
                                plintronLogger.notifyErr("Error save statistic");
                                plintronLogger.notifyErr(e.message);
                            }

                        } else {
                            break;
                        }
                    } catch (e) {
                        plintronLogger.notifyErr('----------  elem error----------');
                        plintronLogger.notifyErr(e.message);
                    }
                    await this.saveUserHistory(item, statisticInfo);
                }
                try {
                    await sftp.delete(filePath);
                } catch (e) {
                    plintronLogger.notifyErr(e.message);
                }
            } catch (e) {
                plintronLogger.notifyErr('----------  fileList error----------');
                plintronLogger.notifyErr(e.message);
            }
        }
        return allData;
    }

    async saveOrUpdateStatistic(userSimStatistics, userSimPlanId, dbReq) {
        try {
            plintronLogger.notify('------------- saveOrUpdateStatistic ------------');
            plintronLogger.notify(userSimStatistics[0]);
            let userSimStatisticId;
            let userSimStatistic = userSimStatistics[0];
            if (userSimStatistic) {
                await UserSimStatistic.update(dbReq, {where: {id: userSimStatistic.id}});
                userSimStatisticId = userSimStatistic.id;
            } else {
                dbReq.userSimPlanId = userSimPlanId;
                userSimStatistic = await UserSimStatistic.create(dbReq);
                userSimStatisticId = userSimStatistic.id;
            }
            plintronLogger.notify(dbReq);
            plintronLogger.notify("userSimStatisticId" + userSimStatisticId);

            userSimStatistic = await UserSimStatistic.findByPk(userSimStatisticId);
            return userSimStatistic;
        } catch (e) {
            throw new PlintronError(e.code, e.message);
        }
    }

    async checkWholesalePlanLimit(userSimStatistic, plintronSim) {
        let spent = 0, min = 0, sms = 0, internet = 0;
        sms = userSimStatistic.sms > 0 ? Math.ceil(userSimStatistic.sms / 20) : 0;
        min = Number(userSimStatistic.min);
        internet = userSimStatistic.internet > 0 ? Math.ceil(userSimStatistic.internet / 1048576) : 0;// Bytes to MB
        spent = sms + min + internet;
        plintronLogger.notify(`sms (${sms}) min (${min}) internet(${internet}) spent(${spent}) UserSimId=${plintronSim.UserSimPlan.id}`);
        if (plintronSim.UserSimPlan.WholesalePlan.unitCap <= spent) await this.changePlan(plintronSim, spent);
    }

    async changePlan(plintronSim, spent) {
        try {
            const optimizePlan = await WholesalePlan.findOne({
                where: {unitCap: {[Op.gt]: spent}},
                order: [['unitCap', 'ASC']]
            });
            errCheckerPlintron(!optimizePlan, 'Optimize wholesale plan not found');

            const req = {
                icc_id: plintronSim.ICCID,
                wps: optimizePlan.WPS
            };
            plintronLogger.notify(`-------------------- changePlan worked --------------------`);
            plintronLogger.notify(req);
            try {
                await PlintronClient.req(req, 'UPDATE_WPS');
            } catch (e) {
                plintronLogger.notify(JSON.stringify(e));
                if(e.code != "506") {
                    throw e;
                }
            }
            await UserSimPlan.update({wholesalePlanId: optimizePlan.id}, {where: {id: plintronSim.UserSimPlan.id}});
            plintronLogger.notify(`Set optimal plan sucsess ICCID - ${plintronSim.ICCID}  wholesalePlanId - ${optimizePlan.id}`);
        } catch (e) {
            plintronLogger.notifyErr(`changePlan ICCID (${plintronSim.ICCID})  message: ${e.message}`);
        }
    }

    async saveUserHistory(data, statisticInfo) {
        try {

            if (statisticInfo.type === "internet") return;

            const elem = data.replace(/[\n\r]/g, '').split(",");
            let dbReq;
            let imsi = elem[statisticInfo.imsiNum].replace(/[^+\d]/g, '')

            const plintronSim = await PlintronSim.findOne({
                where: {IMSI: imsi},
                include: [
                    {
                        model: UserSimPlan,
                        include: [{model: PlintronPlan}]
                    }
                ],
            });
            errCheckerPlintron(!plintronSim, 'Sim not found');

            if (statisticInfo.type === "min") {
                let startTime = parseDate(elem[statisticInfo.callDate].split('.')[0].replace(/[^+\d]/g, ''));
                let endTime = parseDate(elem[statisticInfo.callTerminationTime].split('.')[0].replace(/[^+\d]/g, ''))
                let resultTime = msToTime(endTime - startTime);
                let callType = Number(elem[statisticInfo.callType].split('.')[0].replace(/[^+\d]/g, ''));

                dbReq = {
                    userSimPlanId: plintronSim.UserSimPlan.id,
                    value: resultTime,
                    date: formatDate(elem[statisticInfo.callDate].split('.')[0].replace(/[^+\d]/g, '')),
                    type: statisticInfo.type,
                    callType: callType === 3 ? 'mo' : 'mt',
                    phone: Number(elem[statisticInfo.dialedNumber].split('.')[0].replace(/[^+\d]/g, ''))
                }
            } else if (statisticInfo.type === "sms") {

                plintronLogger.notify(`__________ Saving history __________`);

                // calc sms count
                const usageInfo = await planClass.getBundleFreeUsageInfo({
                    icc_id: plintronSim.ICCID,
                    bundle_code: plintronSim.UserSimPlan.PlintronPlan.planID
                });
                let free_sms = Number(usageInfo.free_onnet_sms);

                plintronLogger.notify('free_sms - ' + free_sms);

                let date = new Date(), y = date.getFullYear(), m = date.getMonth();
                const planHistory = await UserPlanHistory.findAll({
                    where: {
                        userSimPlanId: plintronSim.UserSimPlan.id,
                        type: "sms",
                        createdAt: {
                            [Op.and]: {
                                [Op.gte]: new Date(y, m, 1),
                                [Op.lte]: new Date(y, m + 1, 0)
                            }
                        }
                    },
                });

                plintronLogger.notify(planHistory);

                if (planHistory.length > 0) planHistory.forEach(item => {
                    free_sms += (Number(item.value));
                });
                free_sms = Number(plintronSim.UserSimPlan.PlintronPlan.SMSCount) - free_sms;
                free_sms = free_sms >= 0 ? free_sms : Number(plintronSim.UserSimPlan.PlintronPlan.SMSCount);

                plintronLogger.notify("free_sms 2 - " + free_sms);

                let callType = Number(elem[statisticInfo.callType].split('.')[0].replace(/[^+\d]/g, ''));

                dbReq = {
                    userSimPlanId: plintronSim.UserSimPlan.id,
                    value: free_sms,
                    date: formatDate(elem[statisticInfo.msgDate].split('.')[0].replace(/[^+\d]/g, '')),
                    type: statisticInfo.type,
                    callType: callType === 3 ? 'mo' : 'mt',
                    phone: Number(elem[statisticInfo.dialedNumber].split('.')[0].replace(/[^+\d]/g, ''))
                }
            }
            plintronLogger.notify("__________ UserPlanHistory dbReq __________");
            plintronLogger.notify(dbReq);
            await UserPlanHistory.create(dbReq);
        } catch (e) {
            plintronLogger.notifyErr("__________ Saving history error __________");
            plintronLogger.notifyErr(e.message);
        }
    }
}

module.exports = {
    setOptimalPlan: new SetOptimalPlan()
};