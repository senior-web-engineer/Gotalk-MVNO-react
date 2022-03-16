'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('UserPays', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      action: {
        type: Sequelize.STRING
      },
      sum: {
        type: Sequelize.FLOAT
      },
      userId: {
        type: Sequelize.INTEGER,
        references: { model: 'Users', key: 'id' },
      },
      productId: {
        type: Sequelize.ARRAY({ type: Sequelize.INTEGER })
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: "initial",
      },
      type: {
        type: Sequelize.STRING,
        defaultValue: "initial",
      },
      paymentType: {
        type: Sequelize.STRING,
        defaultValue: "stripe",
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
    await queryInterface.dropTable('UserPays');
  }
};