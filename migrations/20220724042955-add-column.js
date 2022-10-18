'use strict';

module.exports = {
  up: async (queryInterface) => {
    return Promise.all([
      queryInterface.addColumn('user', 'password', {
        type: 'string',
      }),
    ])
  },

  down: async (queryInterface) => {
    return Promise.all([
      queryInterface.removeColumn('user', 'password',),
    ]);
  }
};