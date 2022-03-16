'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('PlintronPlans', [
            {
                name: "Plan 1",
                costPerMonth: 20,
                minuteCount: 30000,
                SMSCount: 30000,
                internetCount: 3,
                expiry: "30",
                planID: 2406,
                autoRenewal: false,
                midcycleRateChange: false
            }, {
                name: "Plan 2",
                costPerMonth: 10,
                minuteCount: 29000,
                SMSCount: 28000,
                internetCount: 1,
                expiry: "30",
                planID: 2404,
                autoRenewal: false,
                midcycleRateChange: false
            }]);
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('PlintronPlans', null, {});
    }
};
