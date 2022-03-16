'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      firstName: 'Owner',
      lastName: 'Owner',
      email: 'owner@owner.com',
      password: bcrypt.hashSync('gACE2BlG', 8),
      role:'Owner'
    },{
      firstName: 'Manager',
      lastName: 'Manager',
      email: 'manager@manager.com',
      password: bcrypt.hashSync('0o16GWoa', 8),
      role:'Manager'
    },{
      firstName: 'Viewer',
      lastName: 'Viewer',
      email: 'viewer@viewer.com',
      password: bcrypt.hashSync('F1R2pmJd', 8),
      role:'Viewer'
    },{
      firstName: 'Customer',
      lastName: 'Customer',
      email: 'customer@customer.com',
      password: bcrypt.hashSync('7qCm8Gxc', 8),
      role:'Customer'
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
