'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('PlintronPlans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      costPerMonth: {
        type: Sequelize.FLOAT
      },
      minuteCount: {
        type: Sequelize.INTEGER
      },
      SMSCount: {
        type: Sequelize.INTEGER
      },
      internetCount: {
        type: Sequelize.INTEGER
      },
      expiry: {
        type: Sequelize.STRING,
        defaultValue:'30'
      },
      planID: {
        type: Sequelize.INTEGER
      },
      autoRenewal: {
        type: Sequelize.BOOLEAN,
        defaultValue:false
      },
      midcycleRateChange: {
        type: Sequelize.BOOLEAN,
        defaultValue:false
      },
      sum: {
        type: Sequelize.FLOAT,
        defaultValue:0
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
    await queryInterface.dropTable('PlintronPlans');
  }
};