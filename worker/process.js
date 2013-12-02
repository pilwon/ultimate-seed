/*
 * worker/process.js
 */

'use strict';

var util = require('util');

require('colors');

var worker = require('./');

worker.bbq.on('error', function (err) {
  console.error(err.stack);
});

worker.bbq.on('active', function (task) {
  console.info(util.format(
    '[ACTIVE:%s:%s]',
    task.id,
    task.type
  ).grey);
});

worker.bbq.on('processing', function (task) {
  console.info(util.format(
    '[PROCESSING:%s:%s] %s ...',
    task.id,
    task.type,
    JSON.stringify(task.data)
  ).bold);
});

worker.bbq.on('complete', function (task) {
  console.info(util.format(
    '[COMPLETE:%s:%s:%ds] %s',
    task.id,
    task.type,
    task.duration / 1000,
    JSON.stringify(task.result)
  ).cyan);
});

worker.bbq.on('failed', function (task) {
  console.error(util.format(
    '[FAILED:%s:%s:%ds] %s',
    task.id,
    task.type,
    task.duration / 1000,
    JSON.stringify(task.result)
  ).red);
});

worker.bbq.on('log', function (task, msg) {
  console.info('[LOG:%s:%s] %s', task.id, task.type, msg);
});

worker.bbq.on('progress', function (task, percent) {
  console.info('[PROGRESS:%s:%s] %d%', task.id, task.type, percent);
});

worker.bbq.processAll(worker.task);
