/*
 * server/lib/middleware/removePoweredBy.js
 */

'use strict';

exports = module.exports = function *(next) {
  this.remove('X-Powered-By');

  yield next;
};
