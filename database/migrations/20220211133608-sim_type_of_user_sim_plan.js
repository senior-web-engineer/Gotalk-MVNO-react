'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
        'UserSimPlans',
        "simType",
        {
          type: Sequelize.STRING
        });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
        'UserSimPlans',
        'simType'
    );
  }
};
