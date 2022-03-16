'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.addColumn(
            'PlintronSims',
            "type",
            {
                type: Sequelize.STRING,
                defaultValue: "esim"
            });
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.removeColumn(
            'PlintronSims',
            'type'
        );
    }
};
