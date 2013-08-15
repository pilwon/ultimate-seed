/*
 * server/controllers/api/test.js
 */

'use strict';

var _ = require('lodash');

// var app = require('../../app');

var _testDB = [
  {
    id: 1,
    hello: 'World'
  },
  {
    id: 2,
    hello: 'Backbone'
  },
  {
    id: 3,
    hello: 'Marionette'
  },
  {
    id: 4,
    hello: 'Node.js'
  },
  {
    id: 5,
    hello: 'ultimate-seed'
  }
];

function LIST(req, cb) {
  cb(null, _testDB);
}

function GET(req, id, cb) {
  var item = null;
  if (_.isArray(_testDB) && _testDB.length) {
    if (_.isNumber(_testDB[0].id)) {
      item = _.find(_testDB, {'id': +id});
    } else {
      item = _.find(_testDB, {'id': id});
    }
  }
  if (item) {
    return cb(null, item);
  } else {
    return cb('invalid id - ' + id);
  }
}

function POST(req, cb) {
  cb(new Error('Not yet implemented.'));
}

function PUT(req, id, cb) {
  cb(new Error('Not yet implemented.'));
}

function DELETE(req, id, cb) {
  cb(new Error('Not yet implemented.'));
}

// Public API
exports.__filename = __filename;
exports.LIST = LIST;
exports.GET = GET;
exports.POST = POST;
exports.PUT = PUT;
exports.DELETE = DELETE;
