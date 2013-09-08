/*
 * client/js/app.js
 */

'use strict';

var _       = require('lodash');
var angular = require('angular');

// Restangular needs to have _ attached to window object.
window._ = _;
require('restangular');

require('./values');
require('./directives');
require('./filters');
require('./services');
require('./modules');
require('./templates');



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

app.run(['$http', '$rootScope', '$route', '$state', '$stateParams', 'security',
    function ($http, $rootScope, $route, $state, $stateParams, security) {
  $rootScope.$on('$routeChangeStart', function () {
    global.config.fromServer = false;
  });

  $rootScope._ = _;
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;

  // Loading the user if the session is still active.
  $rootScope.user = security.requireUser();
}]);


// Public API
exports = module.exports = app;
