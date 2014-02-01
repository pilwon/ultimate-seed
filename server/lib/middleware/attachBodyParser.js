/*
 * server/lib/middleware/attachBodyParser.js
 */

'use strict';

var coBody = require('co-body');

exports = module.exports = function *(next) {
  this.parse = coBody;

  yield next;
};
