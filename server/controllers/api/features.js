/*
 * server/controllers/api/features.js
 */

'use strict';

var fs = require('fs'),
    path = require('path');

var _ = require('lodash');

var app = require('../../app');

function _getFeatures(cb) {
  fs.readFile(path.join(
    app.dir,
    '..',
    app.project.path.client,
    'json',
    'features.json'
  ), 'utf8', function(err, data) {
    if (err) { return cb(err); }
    var json = [];
    try {
      json = JSON.parse(data);
    } catch(e) {}
    cb(null, json);
  });
}

function LIST(req, cb) {
  _getFeatures(cb);
}

function GET(req, id, cb) {
  var item = null;
  _getFeatures(function (err, items) {
    if (err) { return cb(err); }
    if (_.isArray(items) && items.length) {
      if (_.isNumber(items[0].id)) {
        item = _.find(items, {'id': +id});
      } else {
        item = _.find(items, {'id': id});
      }
    }
    if (item) {
      cb(null, item);
    } else {
      cb('invalid id - ' + id);
    }
  });
}

function POST(req, cb) {
  cb('invalid method - ' + req.method);
}

function PUT(req, id, cb) {
  cb('invalid method - ' + req.method);
}

function DELETE(req, id, cb) {
  cb('invalid method - ' + req.method);
}

// Public API
exports.__filename = __filename;
exports.LIST = LIST;
exports.GET = GET;
exports.POST = POST;
exports.PUT = PUT;
exports.DELETE = DELETE;
