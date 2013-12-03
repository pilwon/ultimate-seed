/*
 * worker/index.js
 */

'use strict';

var Barbeque = require('barbeque'),
    ultimate = require('ultimate');

var config = exports.config = ultimate.config(__dirname + '/../config'),
    redisConfig = ultimate.db.redis.getConfig(config.db.redis);

ultimate.db.redis.connect(redisConfig);

exports.bbq = new Barbeque({
  host: redisConfig.host,
  port: redisConfig.port,
  password: redisConfig.password,
  namespace: redisConfig.namespace,
  client: ultimate.db.redis.getClient()
});

exports.task = ultimate.require(__dirname + '/task');

if (require.main === module) {
  require('./process');
}
