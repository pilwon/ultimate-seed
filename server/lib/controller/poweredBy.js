/*
 * server/lib/controller/poweredBy.js
 */

'use strict';

exports = module.exports = function *(next) {
  this.body = 'Powered by <a href="//github.com/pilwon/ultimate-seed">ultimate-seed</a>';
};
