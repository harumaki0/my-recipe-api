'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db) {
    db.createTable('blog', {
    blog_id: {type: 'int', primaryKey: true},
    content: 'string',
    created_at: 'Date'
  });
  return null;
};

exports.down = function (db) {
  db.dropTable('blog');
  return null;
};

exports._meta = {
  "version": 1
};
