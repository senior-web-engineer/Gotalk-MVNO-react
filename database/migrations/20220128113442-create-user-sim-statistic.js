'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('UserSimStatistics', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sms: {
        type: Sequelize.INTEGER,
      },
      min: {
        type: Sequelize.INTEGER,
      },
      internet: {
        type: Sequelize.INTEGER,
      },
      month: {
        type: Sequelize.INTEGER,
      },
      userSimPlanId: {
        type: Sequelize.INTEGER,
        references: { model: 'UserSimPlans', key: 'id' },
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('UserSimStatistics');
  }
};