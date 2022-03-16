'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('UserPlanHistories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      value: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING,
      },
      callType: {
        type: Sequelize.STRING,
      },
      phone: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('UserPlanHistories');
  }
};