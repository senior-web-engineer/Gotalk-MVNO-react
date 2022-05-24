'use strict';
const {
  Model
} = require('sequelize');

const PROTECTED_ATTRIBUTES = ['password','createdAt','updatedAt']

module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    toJSON () {
      let attributes = Object.assign({}, this.get())
      for (let a of PROTECTED_ATTRIBUTES) {
        delete attributes[a]
      }
      return attributes
    }

    static associate(models) {
      User.belongsTo(models.Company, { foreignKey: 'companyId'})
      User.hasOne(models.UserSimPlan,{ foreignKey: 'userId'});
      User.hasMany(models.UserSimPlan,{ foreignKey: 'userId', as: 'UserSimPlans'});
      User.hasMany(models.UserPay,{ foreignKey: 'userId'});
      User.hasOne(models.MultiFactor, { foreignKey: 'userId', as: 'multiFactors', onDelete: 'CASCADE' });
    }
  };

  User.ROLE = ['Owner', 'Manager', 'Viewer', 'Customer'];
  User.STATUSE = ['active', 'blocked','company_blocked'];

  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    role: DataTypes.STRING,
    password: DataTypes.STRING,
    status: DataTypes.STRING,
    phone: DataTypes.STRING,
    country:  DataTypes.STRING,
    city:  DataTypes.STRING,
    street:  DataTypes.STRING,
    apartment: DataTypes.STRING,
    zip: DataTypes.STRING,
    companyId: DataTypes.INTEGER,
    balance: DataTypes.FLOAT,
    stripeCustomerId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
