/*
 * server/lib/middleware/errorCatch.js
 */

'use strict';

exports = module.exports = function *(next) {
  try {
    yield next;
  } catch (err) {
    this.status = err.status || 500;
    this.type = 'html';
    this.body = '<h1>Internal Server Error</h1>';
    this.app.emit('error', err, this);
  }
};
