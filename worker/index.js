/*
 * worker/index.js
 */

'use strict';

var Barbeque = require('barbeque'),
    ultimate = require('ultimate');

var config = exports.config = ultimate.config(__dirname + '/../config');

exports.bbq = new Barbeque({
  host: config.db.redis.host,
  port: config.db.redis.port,
  password: config.db.redis.password,
  namespace: config.db.redis.namespace
});

exports.task = ultimate.require(__dirname + '/task');

if (require.main === module) {
  require('./process');
}
