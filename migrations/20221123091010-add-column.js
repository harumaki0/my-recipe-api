"use strict";

module.exports = {
  up: async (queryInterface) => {
    return Promise.all([
      queryInterface.addColumn("recipe", "user_id", {
        type: "int",
      }),
    ]);
  },

  down: async (queryInterface) => {
    return Promise.all([queryInterface.removeColumn("recipe", "user_id")]);
  },
};
