'use strict';

module.exports = {
  up: async (queryInterface) => {
    return Promise.all([
      queryInterface.addColumn('recipe', 'memo', {
        type: 'string',
      }),
    ])
  },

  down: async (queryInterface) => {
    return Promise.all([
      queryInterface.removeColumn('recipe', 'memo', ),
    ]);
  }
};