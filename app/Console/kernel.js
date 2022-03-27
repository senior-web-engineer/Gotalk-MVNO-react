const cron = require('node-cron');
const parserSim = require("../Services/Plintron/Utils/simCardParse");
const {setOptimalPlan} = require("../Services/Plintron/Utils/setOptimalPlan");
const winston = require("../Utils/logger");
const {simCardClass} = require("../Services/Plintron/simCard");
const {paymentEveryMonth} = require("../Services/Payment/paymentEveryMonth");

class Kernel {
    index() {
        try {
            this.everyHour();
            this.setOptimalPlan();
            this.paymentEveryMonth();
            this.queryPortInRequests();
        } catch (e) {
            winston.logger.error(e.message);
        }
    };

    everyHour() {
        cron.schedule('0 0 */1 * * *', async function () {
            await parserSim.import();
            await simCardClass.changeEsimStatus();
        });
    }

    setOptimalPlan() {
        cron.schedule('*/16 * * * *', async function () {
            await setOptimalPlan.setOptimalPlan();
        });
    }

    paymentEveryMonth() {
        cron.schedule('0 23 */1 * *', async function () {
            await paymentEveryMonth();
        }, {
            scheduled: true,
            timezone: "America/Toronto"
        });
    }

    queryPortInRequests() {
        cron.schedule('*/5 * * * *', async function () {
            await simCardClass.queryPortInRequests();
        });
    }
}


module.exports = {
    kernel: new Kernel()
};