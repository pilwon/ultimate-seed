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

function health(req, res) {
  res.json({
    pid: process.pid,
    memory: process.memoryUsage(),
    uptime: process.uptime()
  });
}

// Public API
exports.index = index;
exports.express = express;
exports.health = health;
