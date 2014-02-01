/*
 * server/lib/controller/catchAll.js
 */

'use strict';

exports = module.exports = function *() {
  this.render('empty', {
    catchAll: true
  });
}
