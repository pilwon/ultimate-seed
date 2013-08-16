/*
 * server/lib/controller.js
 */

'use strict';

var path = require('path');

var app = require('../app');

var _clientDir = path.join(app.dir, '..', app.project.path[
  process.env.NODE_ENV === 'development' ? 'client' : 'dist'
]);

function index(req, res) {
  res.sendfile(path.join(_clientDir, 'index.html'));
}

function error404(req, res) {
  res.status(404).sendfile(path.join(_clientDir, '404.html'));
}

// Public API
exports.index = index;
exports.error404 = error404;
