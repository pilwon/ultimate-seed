/*
 * client/js/app.js
 */

'use strict';

var url = require('url');

var _ = require('lodash'),
    angular = require('angular');

var ngModule = angular.module('app', [
  'ngCookies',
  'restangular',
  'ui.bootstrap',
  'ui.router',
  'app.shared',
  'app.layout',
  'app.account',
  'app.admin',
  'app.auth',
  'app.home'
]);

// Enable HTML5 Mode
ngModule.config(function ($locationProvider) {
  $locationProvider.html5Mode(true);
});

// Set Restacular base URL.
ngModule.config(function (RestangularProvider) {
  RestangularProvider.setBaseUrl('/api');
});

// Routes
ngModule.config(function ($urlRouterProvider) {
  $urlRouterProvider.otherwise(function () {
    if (!global.config.fromServer) {
      global.location.replace(url.parse(global.location.href).path);
    } else if (global.config.notFoundOnServer) {
      global.location.replace('/404.html');
    } else {
      global.config.fromServer = false;
    }
  });
});

// Attach variables to $rootScope.
ngModule.run(function ($rootScope, $state, $stateParams, security) {
  $rootScope._ = _;
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
  $rootScope.user = security.requireUser();
});

// Update `fromServer` global config variable.
ngModule.run(function ($rootScope) {
  $rootScope.$on('$routeChangeStart', function () {
    global.config.fromServer = false;
  });
});
