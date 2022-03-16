'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('WholesalePlans', {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER
                },
                planName: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                planType: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                unitCap: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                overage: {
                    type: Sequelize.FLOAT,
                    allowNull: false,
                },
                WPS: {
                    type: Sequelize.STRING,
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
            },
            {
                indexes: [
                    {
                        unique: true,
                        fields: ['planName', 'WPS']
                    }
                ]
            });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('WholesalePlans');
    }
};