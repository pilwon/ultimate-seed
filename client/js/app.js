/*
 * client/js/app.js
 */

'use strict';

var _ = require('lodash'),
    $ = require('jquery'),
    angular = require('angular'),
    moment = require('moment');

var ngModule = angular.module('app', [
  'ngAnimate',
  'ngCookies',
  'ngSanitize',
  'pascalprecht.translate',
  'restangular',
  'ui.bootstrap',
  'ui.router',
  'btford.socket-io',
  'app.shared',
  'app.layout',
  'app.account',
  'app.admin',
  'app.auth',
  'app.main'
]);

// Enable HTML5 Mode.
ngModule.config(function ($locationProvider) {
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
});

// Set Restangular base URL.
ngModule.config(function (RestangularProvider) {
  RestangularProvider
    .setBaseUrl('/api')
    .setResponseExtractor(function (res) {
      return res.result;
    });
});

// Routes
ngModule.config(function ($stateProvider, $urlRouterProvider, layoutProvider) {
  $stateProvider
    .state('express', {
      url: '*path',
      views: layoutProvider.getViews(),
      onEnter: function () {
        if (_.isPlainObject(global.config) && !!global.config.catchAll) {
          global.location.replace('/404.html');
        }
      }
    });
});

// Load user from global variable sent from server.
ngModule.config(function (authProvider) {
  if (_.isPlainObject(global.config) && global.config.user) {
    authProvider.initUser(global.config.user);
  }
});

// Attach variables to $rootScope.
ngModule.run(function ($location, $rootScope, $state, $stateParams, auth) {
  _.assign($rootScope, {
    _: _,
    $: $,
    $location: $location,
    $state: $state,
    $stateParams: $stateParams,
    app: ngModule,
    config: ngModule.config,
    moment: moment,
    user: auth.getUser()
  });
});

// Loading spinner.
ngModule.run(function ($rootScope, layout) {
  var commonFunc = function (spinnerFunc, event, toState) {
    if (!toState.resolve || _.isEmpty(toState.resolve)) { return; }
    spinnerFunc();
  };
  $rootScope.$on('$stateChangeStart', _.wrap(layout.startSpinner, commonFunc));
  $rootScope.$on('$stateChangeSuccess', _.wrap(layout.stopSpinner, commonFunc));
  $rootScope.$on('$stateChangeError', _.wrap(layout.stopSpinner, commonFunc));
});


