'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.addColumn(
            'Plans',
            "rating",
            {
                type: Sequelize.INTEGER,
                defaultValue: 0
            });
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.removeColumn(
            'Plans',
            'rating'
        );
    }
};
