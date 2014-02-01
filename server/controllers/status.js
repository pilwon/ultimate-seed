/*
 * server/controllers/status.js
 */

'use strict';

function *index() {
  yield this.render('status/index', {
    layout: false
  });
}

function *health() {
  this.body = {
    memory: process.memoryUsage(),
    pid: process.pid,
    time: new Date(),
    uptime: process.uptime()
  };
}

// Public API
exports.index = index;
exports.health = health;
