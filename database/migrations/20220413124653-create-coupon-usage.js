'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('CouponUsages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      couponId: {
        type: Sequelize.INTEGER
      },
      monthCount: {
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.STRING
      },
      usedMonthCount: {
        type: Sequelize.INTEGER
      },
      userSimPlanId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('CouponUsages');
  }
};