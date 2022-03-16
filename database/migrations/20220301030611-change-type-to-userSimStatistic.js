'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.changeColumn('UserSimStatistics', 'sms', {type: Sequelize.BIGINT(11)}),
            queryInterface.changeColumn('UserSimStatistics', 'min', {type: Sequelize.BIGINT(11)}),
            queryInterface.changeColumn('UserSimStatistics', 'internet', {type: Sequelize.BIGINT(11)})
        ])
    },

    down: async (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.changeColumn('UserSimStatistics', 'sms', {type: Sequelize.INTEGER}),
            queryInterface.changeColumn('UserSimStatistics', 'min', {type: Sequelize.INTEGER}),
            queryInterface.changeColumn('UserSimStatistics', 'internet', {type: Sequelize.INTEGER})
        ])
    }
};
