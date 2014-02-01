/*
 * server/lib/middleware/db.js
 */

'use strict';

var db = require('require-all')(__dirname + '/../db');

exports = module.exports = function *(next) {
  // this.db = db.mongodb;
  this.db = db.rethinkdb;

  yield next;
};
