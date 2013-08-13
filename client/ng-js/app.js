/*
 * client/js/app.js
 */

/* global angular */
'use strict';

require('angular');



var app = angular.module('ngApp', [
  'ngCookies',
  'ui.bootstrap',
  'ui.compat'
]);


// Public API
exports = module.exports = app;
