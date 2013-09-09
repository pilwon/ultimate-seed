/*
 * client/js/app.js
 */

'use strict';

var _ = require('lodash'),
    angular = require('angular');

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
  'ui.router'
]);

app.run(['$rootScope', '$state', '$stateParams', 'security',
    function ($rootScope, $state, $stateParams, security) {
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
