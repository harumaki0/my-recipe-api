'use strict';

module.exports = {
  up: async (queryInterface) => {
    return Promise.all([
      queryInterface.addColumn('recipe', 'favorite', {
        type: 'string',
      }),
    ])
  },

  down: async (queryInterface) => {
    return Promise.all([
      queryInterface.removeColumn('recipe', 'favorite', ),
    ]);
  }
};