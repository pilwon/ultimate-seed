/*
 * server/controllers/home.js
 */

'use strict';

function index(req, res) {
  res.render('home/index', {
    notFoundOnServer: true
  });
}

function express(req, res) {
  res.render('home/express', {
    hello: 'Hello from express world!'
  });
}

// Public API
exports.index = index;
exports.express = express;
