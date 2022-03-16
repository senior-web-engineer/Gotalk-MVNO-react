const Sequelize = require('sequelize');
const {MainController} = require("./main.controller");
const db = require("../../Models/index");
const {notifyClass} = require("../../Services/Plintron/notify");
const {PlintronClient} = require("../../Services/Plintron/Utils/plintronClient");
const {plintronLogger} = require("../../Utils/logger");
const PlintronPlan = db.PlintronPlan;
const Op = Sequelize.Op;

class PlintronPlanController extends MainController {

    constructor() {
        super(PlintronPlan);
    }

    getOptimizePlan = async (req, res) => {
        try {
            let body = req.body;
            const optimizePlan = await PlintronPlan.findAll({
                where: {
                    [Op.and]: [
                        {minuteCount: {[Op.gte]: body.min}},
                        {SMSCount: {[Op.gte]: body.sms}},
                        {internetCount: {[Op.gte]: body.internet}}
                    ]
                }
            });
            return this.successRes(res, optimizePlan);
        } catch (e) {
            plintronLogger.error(e.message);
            return this.errorRes(res, e);
        }
    };

    asynchResponse = async (req, res) => {
        let data = req.body;
        let response;
        try {
            data = data['soapenv:envelope']['soapenv:body'][0];
            if (data.notify_data_usage_v2_request)
                response = await notifyClass.notifyData(data.notify_data_usage_v2_request[0]);
            else if (data.asynch_response_request)
                response = await notifyClass.asynchResponse(data.asynch_response_request[0]);
            else if (data.notify_api_status_activate_sim_with_bundle_request)
                response = await notifyClass.notifyApiStatusActivateSimBundle(data.notify_api_status_activate_sim_with_bundle_request[0]);
            else if (data.notify_api_status_request)
                response = await notifyClass.notifyApiStatus(data.notify_api_status_request[0]);
            else if (data.portout_validation_request)
                response = await notifyClass.portoutValidation(data.portout_validation_request[0]);
            else if (data.portout_deactivation_request)
                response = await notifyClass.portoutDeactivation(data.portout_deactivation_request[0]);
            else throw new Error('method not found');
        } catch (e) {
            plintronLogger.error(e.message);
            plintronLogger.error(data);
            response = await PlintronClient.objToSoap(notifyClass.getMessage(999), 'NOTIFY_RESPONSE');
        }
        return res.type('application/xml').send(response);
    };
}

module.exports = {
    PlintronPlanController
};