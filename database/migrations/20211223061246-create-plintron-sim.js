'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('PlintronSims', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ICCID: {
        type: Sequelize.STRING
      },
      PINOne: {
        type: Sequelize.STRING
      },
      PUKOne: {
        type: Sequelize.STRING
      },
      PINTwo: {
        type: Sequelize.STRING
      },
      PUKTwo: {
        type: Sequelize.STRING
      },
      IMSI: {
        type: Sequelize.STRING
      },
      MSISDN: {
        type: Sequelize.STRING
      },
      sum: {
        type: Sequelize.FLOAT
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: 'FREE',
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
    await queryInterface.dropTable('PlintronSims');
  }
};