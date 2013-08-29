/*
 * client/js/app.js
 */

'use strict';

var _       = require('lodash');
var angular = require('angular');

// Restangular needs to have _ attached to window object.
window._ = _;
require('restangular');

require('./directives');
require('./filters');
require('./services');
require('./modules');
require('./templates');
require('./values');



var app = angular.module('ngApp', [
  // Angular modules (alphabetical order)
  'ngCookies',

  // Custom modules (alphabetical order)
  'ngApp.directives',
  'ngApp.filters',
  'ngApp.modules',
  'ngApp.services',
  'ngApp.templates',
  'ngApp.values',

  // Third-party modules (alphabetical order)
  'restangular',
  'ui.bootstrap',
  'ui.compat'
]);

app.run(['$rootScope', '$state', '$stateParams',
    function ($rootScope, $state, $stateParams) {
  $rootScope._ = _;
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
}]);


// Public API
exports = module.exports = app;
