/*
 * server/lib/middleware/error404.js
 */

'use strict';

exports = module.exports = function *(next) {
  yield next;

  // if (!this.body && this.idempotent) {
  //   this.redirect('/404.html');
  // }
};
