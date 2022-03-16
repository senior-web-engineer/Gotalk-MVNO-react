'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
        'PlintronSims',
        "newIMSI",
        {
          type: Sequelize.STRING,
          allowNull: true,
        });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
        'PlintronSims',
        'newIMSI'
    );
  }
};
