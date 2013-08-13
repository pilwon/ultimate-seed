/*
 * client/js/lib/index.js
 */

'use strict';

var lib = {
  Backbone: require('./backbone'),
  googleAnalytics: require('./google-analytics'),
  kissmetrics: require('./kissmetrics'),
  util: require('./util')
};

// Public API
exports = module.exports = lib;
