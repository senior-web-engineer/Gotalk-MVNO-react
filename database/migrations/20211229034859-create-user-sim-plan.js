'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('UserSimPlans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      plintronSimId: {
        type: Sequelize.INTEGER,
        references: { model: 'PlintronSims', key: 'id' },
      },
      planId: {
        type: Sequelize.INTEGER,
        references: { model: 'Plans', key: 'id' },
      },
      newPlanId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: { model: 'Plans', key: 'id' },
      },
      plintronPlanId: {
        type: Sequelize.INTEGER,
        references: { model: 'PlintronPlans', key: 'id' },
      },
      deliveryId: {
        type: Sequelize.INTEGER,
        references: { model: 'Deliveries', key: 'id' },
        allowNull: true,
      },
      status: {
        type: Sequelize.STRING,
        defaultValue:"not_active"
      },
      userId: {
        type: Sequelize.INTEGER,
        references: { model: 'Users', key: 'id' },
        
        allowNull: true
      },
      expireDate: {
        type: Sequelize.DATE,
        defaultValue: null
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
    await queryInterface.dropTable('UserSimPlans');
  }
};