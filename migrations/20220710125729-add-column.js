// exports.up = function (db) {
//   // const columns = ['picture', 'reference', 'memo', 'favorite'];
//   return db.addColumn('recipe','picture', {
//     type: 'string',
//     notNull: false
//   }, (err) => { console.log('an error occurs', err) });
// };

// exports.down = function (db) {
//   // const columns = ['picture', 'reference', 'memo', 'favorite'];
//   return db.removeColumn('recipe','picture', {
//     type: 'string',
//     length: 255,
//     notNull: false
//   }, (err) => { console.log('an error occurs', err) });
// };

// 'use strict';

// var dbm;
// var type;
// var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
// exports.setup = function(options, seedLink) {
//   dbm = options.dbmigrate;
//   type = dbm.dataType;
//   seed = seedLink;
// };

// exports.up = function (db) {
//   db.addColumn('recipe','picture', 'varchar(255)', (err) => { console.log('an error occurs', err) });
//   return null;
// };

// exports.down = function (db) {
//   db.removeColumn('recipe','picture', (err) => { console.log('an error occurs', err) });
//   return null;
// };

// exports._meta = {
//   "version": 1
// };




'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('recipe', 'picture', {
        type: Sequelize.STRING(128),
      }),
    ])
  },

  down: async (queryInterface) => {
    return Promise.all([
      queryInterface.removeColumn('recipe', 'picture'),
    ]);
  }
};