'use strict';
const {
    Model
} = require('sequelize');

const PROTECTED_ATTRIBUTES = ['createdAt','updatedAt']

module.exports = (sequelize, DataTypes) => {
    class MultiFactor extends Model {

        toJSON() {
            let attributes = Object.assign({}, this.get())
            for (let a of PROTECTED_ATTRIBUTES) {
                delete attributes[a]
            }
            return attributes
        }

        static associate(models) {
            MultiFactor.belongsTo(models.User, {foreignKey: 'userId', as: 'user'});
        }
    };


    MultiFactor.init({
        emailFactor: DataTypes.BOOLEAN,
        yubicoFactor: DataTypes.BOOLEAN,
        emailKey: DataTypes.STRING,
        clientID: DataTypes.STRING,
        secretKey: DataTypes.STRING,
        emailDate: DataTypes.DATE,

    }, {
        sequelize,
        modelName: 'MultiFactor',
    });
    return MultiFactor;
};