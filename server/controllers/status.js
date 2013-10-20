/*
 * server/controllers/status.js
 */

'use strict';

function index(req, res) {
  res.render('status/index', {
    layout: false
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
exports.health = health;
