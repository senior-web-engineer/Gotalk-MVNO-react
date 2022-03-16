'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Plans', [
            {
                name: "Plan 1",
                costPerMonth: 700,
                costBuyPlan: 300,
                minuteCount: 30000,
                SMSCount: 30000,
                internetCount: 3,
                isCompany: true,
                hotspot: false,
            },{
                name: "Plan 2",
                costPerMonth: 43,
                costBuyPlan: 21,
                minuteCount: 20,
                SMSCount: 5,
                internetCount: 7,
                isCompany: true,
                hotspot: false,
            },{
                name: "Plan 3",
                costPerMonth: 500,
                costBuyPlan: 231,
                minuteCount: 29000,
                SMSCount: 28000,
                internetCount: 1,
                isCompany: false,
                hotspot: true,
            },{
                name: "Plan 4",
                costPerMonth: 500,
                costBuyPlan: 320,
                minuteCount: 10,
                SMSCount: 11,
                internetCount: 12,
                isCompany: false,
                hotspot: false,
            }]);
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Plans', null, {});
    }
};
