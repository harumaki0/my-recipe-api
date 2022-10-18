'use strict';

module.exports = {
  up: async (queryInterface) => {
    return Promise.all([
      queryInterface.addColumn('recipe', 'registration_date', {
        type: 'date',
      }),
    ])
  },

  down: async (queryInterface) => {
    return Promise.all([
      queryInterface.removeColumn('recipe', 'registration_date',),
    ]);
  }
};