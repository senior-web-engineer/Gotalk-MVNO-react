'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Deliveries', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: Sequelize.STRING(255),
      lastName: Sequelize.STRING(255),
      status: {
        type: Sequelize.STRING,
        defaultValue: 'processed',
      },
      country: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      city: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      street: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      apartment: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      zip: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      deliveryType: {
        type: Sequelize.STRING,
        defaultValue: 'site',
      },
      deliveryId: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('Deliveries');
  }
};