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
    memory: process.memoryUsage(),
    pid: process.pid,
    time: new Date(),
    uptime: process.uptime()
  });
}

// Public API
exports.index = index;
exports.health = health;
