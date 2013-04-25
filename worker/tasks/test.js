/*
 * worker/tasks/test.js
 */

require('colors');

var path = require('path');

var _ = require('lodash'),
    async = require('async');

var config = require(path.join('../../config', process.env.NODE_ENV || 'development'));

var DEBUG = false || parseInt(process.env.DEBUG);

function main() {
  async.waterfall([
    function (cb) {
      if (DEBUG) { console.log('test'.cyan); }
      console.log(_.keys(config).join('\n'));
      cb();
    }
  ], function (err) {
    if (err) { console.error(err) };
  })
}

if (require.main === module) {
  main();
}

exports = module.exports = main;
