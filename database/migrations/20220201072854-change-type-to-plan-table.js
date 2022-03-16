'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('Plans', 'minuteCount', {type: Sequelize.BIGINT(11)}),
      queryInterface.changeColumn('Plans', 'SMSCount', {type: Sequelize.BIGINT(11)}),
      queryInterface.changeColumn('Plans', 'internetCount', {type: Sequelize.BIGINT(11)}),
      queryInterface.changeColumn('PlintronPlans', 'minuteCount', {type: Sequelize.BIGINT(11)}),
      queryInterface.changeColumn('PlintronPlans', 'SMSCount', {type: Sequelize.BIGINT(11)}),
      queryInterface.changeColumn('PlintronPlans', 'internetCount', {type: Sequelize.BIGINT(11)}),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('Plans', 'minuteCount', {type: Sequelize.INTEGER}),
      queryInterface.changeColumn('Plans', 'SMSCount', {type: Sequelize.INTEGER}),
      queryInterface.changeColumn('Plans', 'internetCount', {type: Sequelize.INTEGER}),
      queryInterface.changeColumn('PlintronPlans', 'minuteCount', {type: Sequelize.INTEGER}),
      queryInterface.changeColumn('PlintronPlans', 'SMSCount', {type: Sequelize.INTEGER}),
      queryInterface.changeColumn('PlintronPlans', 'internetCount', {type: Sequelize.INTEGER}),
    ])
  }
};
