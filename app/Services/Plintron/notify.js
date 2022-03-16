const {setOptimalPlan} = require("./Utils/setOptimalPlan");
const {errCheckerPlintron} = require("../../Exceptions/plintronError");
const {formatBytes} = require("../../Utils/memoryConvertor");
const {PlintronClient} = require("./Utils/plintronClient");
const {plintronLogger} = require("../../Utils/logger");
const db = require("../../Models/index");
const {simCardClass} = require("./simCard");
const {plintron, app} = require("../../../config/index.config");
const {mailerServices} = require("../mailer.services");
const Plan = db.Plan;
const User = db.User;
const Delivery = db.Delivery;
const PlintronPlan = db.PlintronPlan;
const PlintronSim = db.PlintronSim;
const UserSimPlan = db.UserSimPlan;
const WholesalePlan = db.WholesalePlan;
const UserSimStatistic = db.UserSimStatistic;
const PlintronStatistic = db.PlintronStatistic;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

class NotifyClass {

    async notifyData(data) {
        const response = await PlintronClient.objToSoap(this.getMessage(0), 'NOTIFY_RESPONSE');
        try {
            plintronLogger.notify("------------------------- notifyData -------------------------");
            const imsi = data?.imsi[0]
            const remaining = data.product_list[0].product[0].usage[0].remaining[0];
            plintronLogger.notify(remaining);
            const internetRemainingByte = formatBytes(remaining.unit[0], remaining.value[0]);
            plintronLogger.notify(`IMSI (${imsi}) remaining = ${JSON.stringify(remaining)} Remaining Byte = ${internetRemainingByte}`);

            const plintronSim = await PlintronSim.findOne({
                where: {IMSI: imsi},
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

            try {
                await PlintronStatistic.create({
                    fileName: 'notifyData - internet',
                    type: 'internet',
                    value: internetRemainingByte || null,
                    IMSI: imsi || null,
                    data: JSON.stringify(data)
                });
            } catch (e) {
                plintronLogger.notifyErr("Error save statistic");
                plintronLogger.notifyErr(e.message);
            }

            errCheckerPlintron(!plintronSim, 'Plintron sim plan not found');
            let internet = plintronSim.UserSimPlan.PlintronPlan.internetCount - internetRemainingByte;
            let dbReq = {
                internet: internet > 0 ? internet : plintronSim.UserSimPlan.PlintronPlan.internetCount
            };
            await setOptimalPlan.setOptimalPlanItem(plintronSim, dbReq);
        } catch (e) {
            plintronLogger.notifyErr(e.message);
        }
        return response;
    }

    async asynchResponse(data) {
        let message = this.getMessage(0);
        try {
            plintronLogger.notify("------------------------- asynchResponse -------------------------");

            const msisdn = data?.msisdn[0] || null;
            const icc_id = data?.icc_id[0] || null;
            const result = data?.result[0] || null;
            plintronLogger.notify(`MSISDN (${msisdn}) ICC_ID = ${icc_id} result = ${result}`);
            if (msisdn && icc_id && result && result === "SUCCESS") {
                const plintronSim = await PlintronSim.findOne({
                    where: {ICCID: icc_id, status: {[Op.not]: 'BUSY'}},
                    include: [
                        {
                            model: UserSimPlan,
                            include: [
                                {model: PlintronPlan},
                                {model: Plan, as: 'plan'},
                                {model: User}
                            ]
                        }
                    ]
                });

                if (plintronSim) {
                    await PlintronSim.update({status: 'BUSY', MSISDN: msisdn}, {where: {id: plintronSim.id}});
                    let status = 'plan_not_set', isError = true, message = '';
                    try {
                        const req = {icc_id, bundle_code: plintronSim.UserSimPlan.PlintronPlan.planID};
                        plintronLogger.notify(req);
                        const result = await PlintronClient.req(req, 'SUBSCRIBE_BUNDLE');
                        if (result?.subscribe_bundle_response) {
                            status = 'active';
                            isError = false;
                        }
                    } catch (e) {
                        plintronLogger.notifyErr(e.message);
                    }

                    await UserSimPlan.update({status}, {where: {id: plintronSim.UserSimPlan.id}});
                    await Plan.update({rating: (plintronSim.UserSimPlan.plan.rating + 1)}, {where: {id: plintronSim.UserSimPlan.id}});

                    if (!isError) {
                        message = `SIM card successfully activated your number: ${msisdn}`;
                        await mailerServices.sender(plintronSim.UserSimPlan.User.email, message, "Sim activate and set phone number", "sim/buySim");
                    } else {
                        plintronLogger.notify({
                            MSISDN: msisdn,
                            productId: plintronSim.UserSimPlan.id,
                            userId: plintronSim.UserSimPlan.User.id,
                            message: message
                        });
                        throw new Error(`MSISDN (${msisdn}) ICC_ID = ${icc_id} result = ${result}`);
                    }
                } else message = this.getMessage(9000);
            } else {
                mailerServices.sender(app.defaultEmail, `Asynch Response MSISDN (${msisdn}) ICC_ID = ${icc_id} result = ${result}`, "Error sim", "admin/importSimCardError");
                throw new Error(`MSISDN (${msisdn}) ICC_ID = ${icc_id} result = ${result}`);
            }
        } catch (e) {
            plintronLogger.notifyErr(e.message);
            message = this.getMessage(999);
        }
        return await PlintronClient.objToSoap(message, 'NOTIFY_RESPONSE');
    }

    async notifyApiStatusActivateSimBundle(data) {
        let message = this.getMessage(0);
        try {
            plintronLogger.notify("------------------------- notifyApiStatusActivateSimBundle -------------------------");
            plintronLogger.notify(data);
        } catch (e) {
            plintronLogger.notifyErr(e.message);
            message = this.getMessage(999);
        }
        return await PlintronClient.objToSoap(message, 'NOTIFY_RESPONSE');
    }

    async notifyApiStatus(data) {
        let message = this.getMessage(0);
        try {
            plintronLogger.notify("------------------------- notifyApiStatus -------------------------");
            plintronLogger.notify(data);
            const type = data?.api_request_type[0] || null;

            switch (type) {
                case "CHANGE_SIM":
                    const msisdn = data?.msisdn[0] || null;
                    const imsi = data?.imsi[0] || null;
                    const status = data?.response_desc[0] || null;
                    plintronLogger.notify(`CHANGE_SIM (MSISDN (${msisdn}) ICC_ID = ${imsi} result = ${status})`);
                    if (msisdn && imsi) {
                        let sim = await PlintronSim.findOne({
                            where: {MSISDN: msisdn},
                            include: [{model: UserSimPlan}],
                        });
                        let newSim = await PlintronSim.findOne({where: {IMSI: sim.newIMSI}});
                        errCheckerPlintron(!sim, "Sim not found");
                        errCheckerPlintron(!newSim, "New sim not found");
                        if (status === "Success") {
                            plintronLogger.notify(`Success`);
                            let IMSI = '', MSISDN = '';
                            try {
                                const accountDetails = await simCardClass.getAccountDetails(newSim.ICCID);
                                errCheckerPlintron(!accountDetails?.primary_imsi, 'No SIM card information');
                                IMSI = accountDetails.primary_imsi;
                                MSISDN = accountDetails.msisdn
                            } catch (e) {
                                plintronLogger.notifyErr("notifyApiStatus error get accountDetails");
                                plintronLogger.notifyErr(e.message);
                            }

                            await newSim.update({status: 'BUSY', IMSI, MSISDN});
                            await sim.update({status: 'BLOCKED', IMSI: "", MSISDN: ""});
                            await UserSimPlan.update({
                                plintronSimId: newSim.id,
                                status: "active",
                                simType: newSim.type
                            }, {where: {plintronSimId: sim.id}});
                        } else {
                            plintronLogger.notify(`Failed`);
                            await simCardClass.extMnpCancelPortin({
                                icc_id: sim.ICCID,
                                pmsisdn: sim.PMSISDN,
                                cancelation_type: '1',
                            });
                            const result = await simCardClass.simActivate(sim.UserSimPlan.id, sim.UserSimPlan.userId);
                            plintronLogger.notify(result);
                        }
                    } else {
                        plintronLogger.notifyErr("CHANGE_SIM data is not correct");
                        message = this.getMessage(9000);
                    }
                    break;
                default:
                    throw new Error("notifyApiStatus type not found");
            }
        } catch (e) {
            plintronLogger.notifyErr(e.message);
            message = this.getMessage(999);
        }
        return await PlintronClient.objToSoap(message, 'NOTIFY_RESPONSE');
    }

    async portoutValidation(data) {
        let message = this.getMessage(0);
        try {
            plintronLogger.notify("------------------------- portoutValidation -------------------------");
            plintronLogger.notify(data);
        } catch (e) {
            plintronLogger.notifyErr(e.message);
            message = this.getMessage(999);
        }
        return await PlintronClient.objToSoap(message, 'NOTIFY_RESPONSE');
    }

    async portoutDeactivation(data) {
        let message = this.getMessage(0);
        try {
            plintronLogger.notify("------------------------- portoutDeactivation -------------------------");
            plintronLogger.notify(data);
        } catch (e) {
            plintronLogger.notifyErr(e.message);
            message = this.getMessage(999);
        }
        return await PlintronClient.objToSoap(message, 'NOTIFY_RESPONSE');
    }

    getMessage(code) {
        return plintron.codeList.find(item => item.code === code);
    }
}


module.exports = {
    notifyClass: new NotifyClass()
};