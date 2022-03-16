'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
        'Users',
        "balance",
        {
          type: Sequelize.FLOAT,
          allowNull: false,
          defaultValue: 0
        });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
        'Users',
        'balance'
    );
  }
};
