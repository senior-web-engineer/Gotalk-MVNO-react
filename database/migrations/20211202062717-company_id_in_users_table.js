'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.addColumn(
            'Users',
            "companyId",
            {
                type: Sequelize.INTEGER,
                references: {model: 'Companies', key: 'id'},
                allowNull: true
            });
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.removeColumn(
            'Users',
            'companyId'
        );
    }
};
