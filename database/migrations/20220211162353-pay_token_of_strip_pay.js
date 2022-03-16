'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
        'StripPays',
        "payToken",
        {
          type: Sequelize.STRING
        });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
        'StripPays',
        'payToken'
    );
  }
};
