/*
 * server/controllers/api/users.js
 */

'use strict';

var app = require('../../app');

function LIST(req, cb) {
  var options = null;
  if (req.query.sortfield && req.query.sortcourse) {
    options = {};
    options.sort = {};
    options.sort[req.query.sortfield] = parseInt(req.query.sortcourse);
  }
  if (req.query.limit) {
    options = options ? options : {};
    options.limit = req.query.limit;
  }
  if (req.query.page) {
    options = options ? options : {};
    options.skip = req.query.page;
  }
  app.models.User.FindAllUser(options, function (err, user) {
    if (err) {
      cb(new Error('Not Elements User.'));
    } else {
      app.models.User.CountUser(options, function (err, countUser) {
        if (err) {
          cb(new Error('Not Elements User.'));
        } else {
          return cb(null, {count: countUser, list: user});
        }
      });
    }
  });
}

function GET(req, id, cb) {
  app.models.User.FindOneByIdUser(id, function (err, user) {
    if (err) {
      cb(new Error('Not Element User.'));
    } else {
      return cb(null, user);
    }
  });
}

function POST(req, cb) {
  app.models.User.CreateOneUser(req.body, function (err, user) {
    if (err) {
      cb(new Error('Not create User.'));
    } else {
      return cb(null, user);
    }
  });
}

function PUT(req, id, cb) {
  app.models.User.findOneAndUpdateUser(id, req.body, function (err, user) {
    if (err) {
      cb(new Error('Not update User.'));
    } else {
      return cb(null, user);
    }
  });
}

function DELETE(req, id, cb) {
  app.models.User.FindOneAndDeleteUser(id, function (err, user) {
    if (err) {
      cb(new Error('Not delete User.'));
    } else {
      return cb(null, user);
    }
  });
}

// Public API
exports.LIST = LIST;
exports.GET = GET;
exports.POST = POST;
exports.PUT = PUT;
exports.DELETE = DELETE;
