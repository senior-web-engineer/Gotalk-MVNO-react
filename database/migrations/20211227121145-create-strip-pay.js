'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('StripPays', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            idStrip: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            userPayId: {
                type: Sequelize.INTEGER,
                references: {model: 'UserPays', key: 'id'},
                onDelete: 'CASCADE'
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
        await queryInterface.dropTable('StripPays');
    }
};