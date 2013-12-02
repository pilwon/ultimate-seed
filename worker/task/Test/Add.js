/*
 * Test.Add
 */

'use strict';

var config = require('../..').config;

function process(task, done) {
  task.log('Hello World!');
  done(null, task.data.a + task.data.b);
}

// Public API
exports = module.exports = process;
