const {planClass} = require("../../Services/Plintron/plan");
const {simCardClass} = require("../../Services/Plintron/simCard");
const {setOptimalPlan} = require("../../Services/Plintron/Utils/setOptimalPlan");

class TestController {

    test = async (req, res) => {
        try {
            await setOptimalPlan.setOptimalPlan();
            return res.json(true);
        } catch (e) {
            return res.status(400).json({code: e.code || 0, message: e.message || "Error"});
        }
    };

    testPlintron = async (req, res) => {
        try {
            const body = req.body;
            let result;
            switch (req.query.type) {
                case 'accountDetails':
                    result = await simCardClass.getAccountDetails(body.icc_id);
                    break;
                case 'queryDevice':
                    result = await simCardClass.queryDevice(body);
                    break;
                case 'changeSim':
                    result = await simCardClass.changeSimPlintron(body);
                    break;
                case 'changePlan':
                    result = await planClass.changePlanPlintron(body);
                    break;
                case 'manageCallForwarding':
                    result = await simCardClass.manageCallForwarding(body);
                    break;
                case 'updateWps':
                    result = await planClass.updateWps(body);
                    break;
                case 'extMnpCheckPortinEligibility':
                    result = await simCardClass.extMnpCheckPortinEligibility(body);
                    break;
                case 'extMnpQueryPortin':
                    result = await simCardClass.extMnpQueryPortin(body);
                    break;
                case 'extMnpCreatePortin':
                    result = await simCardClass.extMnpCreatePortin(body);
                    break;
                case 'extMnpUpdatePortin':
                    result = await simCardClass.extMnpUpdatePortin(body);
                    break;
                case 'extMnpCancelPortin':
                    result = await simCardClass.extMnpCancelPortin(body);
                    break;
                case 'portoutDeactivation':
                    result = await simCardClass.portoutDeactivation(body);
                    break;
                case 'portoutValidation':
                    result = await simCardClass.portoutValidation(body);
                    break;
            }
            return res.json(result);
        } catch (e) {
            return res.status(400).json({code: e.code || 0, message: e.message || "Error"});
        }
    };
}

module.exports = {
    TestController
};

