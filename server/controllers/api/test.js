/*
 * server/controllers/api/test.js
 */

'use strict';

var _ = require('lodash');

var _testDB = [
  { id: '1', hello: 'Thanks' },
  { id: '2', hello: 'For' },
  { id: '3', hello: 'Using' },
  { id: '4', hello: 'ultimate-seed' },
  { id: '5', hello: ':)' }
];

function LIST(req, cb) {
  cb(null, _testDB);
}

function GET(req, id, cb) {
  var item = _.find(_testDB, { id: id });
  if (item) {
    return cb(null, item);
  } else {
    return cb(new Error('Invalid ID: ' + id));
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
exports.LIST = LIST;
exports.GET = GET;
exports.POST = POST;
exports.PUT = PUT;
exports.DELETE = DELETE;
