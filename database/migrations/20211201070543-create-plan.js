'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Plans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        unique: true
      },
      costPerMonth: {
        type: Sequelize.FLOAT
      },
      costBuyPlan: {
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
      isCompany: {
        type: Sequelize.BOOLEAN
      },
      hotspot: {
        type: Sequelize.BOOLEAN
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      props: {
        type: Sequelize.JSON,
        allowNull: true,
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
    }, {
      indexes: [{
        fields: ['name'],
        unique: true,
      }]
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Plans');
  }
};