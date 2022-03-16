'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.removeColumn(
        'UserSimStatistics',
        'month'
    );

  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.addColumn(
        'UserSimStatistics',
        'month',
        Sequelize.INTEGER
    );
  }
};
