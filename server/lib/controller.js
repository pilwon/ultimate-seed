/*
 * server/lib/controller.js
 */

'use strict';

var path = require('path');

var app = require('../app');

function catchAll(req, res) {
  res.render('empty', {
    catchAll: true
  });
}

function error404(req, res) {
  res.status(404).sendfile(path.join(
    path.join(app.dir, '..', app.project.path.static),
    '404.html'
  ));
}

// Public API
exports.catchAll = catchAll;
exports.error404 = error404;
