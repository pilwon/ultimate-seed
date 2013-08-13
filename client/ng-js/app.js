/*
 * client/js/app.js
 */

'use strict';

require('angular');



var app = angular.module('ngApp', [
  'ngCookies',
  'ui.bootstrap',
  'ui.compat'
]);


// Public API
exports = module.exports = app;
