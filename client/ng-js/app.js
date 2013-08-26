/*
 * client/js/app.js
 */

'use strict';

var _       = require('lodash');
var angular = require('angular');

require('./values');
require('./directives');
require('./filters');
require('./services');
require('./modules');



var app = angular.module('ngApp', [
  // Angular modules (alphabetical order)
  'ngCookies',

  // Custom modules (alphabetical order)
  'ngApp.directives',
  'ngApp.filters',
  'ngApp.modules',
  'ngApp.services',
  'ngApp.values',

  // Third-party modules (alphabetical order)
  'ui.bootstrap',
  'ui.compat'
]);

app.run(function ($rootScope, $state, $stateParams) {
  $rootScope._ = _;
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
});


// Public API
exports = module.exports = app;
