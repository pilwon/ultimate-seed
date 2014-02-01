/*
 * server/lib/db/rethinkdb.js
 */

'use strict';

var r = require('rethinkdbdash')();

var DEFAULT_DB = 'test';

function _error(message) {
  return {
    error: {
      message: message
    }
  };
}

function Database(dbName) {
  this._db = dbName;
}

Database.prototype.table = function (tableName) {
  return new Table(this._db, tableName);
};

function Table(dbName, tableName) {
  this._db = dbName;
  this._table = tableName;
}

Table.prototype.delete = function *(id) {
  var result = yield r.db(this._db).table(this._table).get(id).delete({
    returnVals: true
  }).run();

  if (result.deleted) {
    return result['old_val'];
  } else {
    return _error('Failed to delete');
  }
};

Table.prototype.deleteAll = function *() {
  return yield r.db(this._db).table(this._table).delete().run(conn, callback)
};

Table.prototype.get = function *(id) {
  return yield r.db(this._db).table(this._table).get(id).run();
};

Table.prototype.getAll = function *() {
  var cursor = yield r.db(this._db).table(this._table).run();

  return yield cursor.toArray();
};

Table.prototype.insert = function *(doc) {
  var result = yield r.db(this._db).table(this._table).insert(doc, {
    returnVals: true
  }).run();

  if (result.inserted) {
    return result['new_val'];
  } else {
    return _error('Failed to insert');
  }
};

Table.prototype.update = function *(id, doc) {
  var result = yield r.db(this._db).table(this._table).get(id).update(doc, {
    returnVals: true
  }).run();

  if (result.replaced) {
    return result['new_val'];
  } else {
    return _error('Failed to update');
  }
};

// Public API
exports = module.exports = function (dbName) {
  return new Database(dbName);
};
exports.table = function (tableName) {
  return new Table(DEFAULT_DB, tableName);
};
exports.r = r;
