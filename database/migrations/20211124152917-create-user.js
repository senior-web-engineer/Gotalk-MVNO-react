'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            firstName: Sequelize.STRING(255),
            lastName: Sequelize.STRING(255),
            email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            password: {
                allowNull: false,
                type: Sequelize.STRING
            },
            role: {
                type: Sequelize.ENUM,
                values: [
                    'Owner',
                    'Manager',
                    'Viewer',
                    'Customer'
                ],
                defaultValue: 'Customer',
            },
            status: {
                type: Sequelize.STRING,
                defaultValue: 'active',
            },
            phone: {
                type: Sequelize.STRING,
                allowNull: true,
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
                fields: ['email'],
                unique: true,
            }]
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Users');
    }
};