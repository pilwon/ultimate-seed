/*
 * server/lib/middleware/responseTime.js
 */

'use strict';

exports = module.exports = function *(next) {
  var start = Date.now();

  yield next;

  this.set('X-Response-Time', (Date.now() - start) + 'ms');
};
