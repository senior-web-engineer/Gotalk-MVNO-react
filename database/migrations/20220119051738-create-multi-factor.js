'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('MultiFactors', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            emailFactor: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            yubicoFactor: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            emailKey: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            emailDate: {
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                type: Sequelize.DATE
            },
            clientID: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            secretKey: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            userId: {
                type: Sequelize.INTEGER,
                references: {model: 'Users', key: 'id'},
                onDelete: 'CASCADE',
                allowNull: false
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
        await queryInterface.dropTable('MultiFactors');
    }
};
