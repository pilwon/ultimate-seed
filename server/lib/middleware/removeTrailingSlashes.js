/*
 * server/lib/middleware/removeTrailingSlashes.js
 */

'use strict';

exports = module.exports = function *(next) {
  var redirectPath = this.path.replace(/(\/+)/g, '/')
                              .replace(/\/((?:\?.*)?)$/, '$1')
                              .replace(/^([^\/])/, '/$1');

  if (this.path !== redirectPath && this.path !== '/') {
    return this.redirect(redirectPath || '/');
  }

  yield next;
};
