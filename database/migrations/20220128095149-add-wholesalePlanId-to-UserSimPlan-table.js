'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
        'UserSimPlans',
        "wholesalePlanId",
        {
          type: Sequelize.INTEGER,
          references: {model: 'WholesalePlans', key: 'id'},
        });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
        'UserSimPlans',
        'wholesalePlanId'
    );
  }
};
