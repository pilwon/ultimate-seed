/*
 * client/js/app.js
 */

'use strict';

var _ = require('lodash'),
    angular = require('angular'),
    socketio = require('socketio');

// default dependencies
var dependencies = [
  'ngAnimate',
  'ngCookies',
  'ngSanitize',
  'pascalprecht.translate',
  'restangular',
  'ui.bootstrap',
  'ui.router',
];

// loading the ultimate-module dependency list and insert all modules in the dependencies list
require('./dependency').list().map(function(dep) {
  dependencies.push(dep.module);
});

var ngModule = angular.module('app', dependencies);

// Enable HTML5 Mode.
ngModule.config(function ($locationProvider) {
  $locationProvider.html5Mode(true);
});

// Set Restacular base URL.
ngModule.config(function (RestangularProvider) {
  RestangularProvider.setBaseUrl('/api');
});

// Routes
ngModule.config(function ($stateProvider, $urlRouterProvider, layoutProvider) {
  $stateProvider
    .state('express', {
      url: '*path',
      views: layoutProvider.getViews(),
      onEnter: function () {
        if (!!global.config.catchAll) {
          global.location.replace('/404.html');
        }
      }
    });
});

// Load user from global variable sent from server.
ngModule.config(function (authProvider) {
  authProvider.loadUserFromGlobal();
});

// Attach variables to $rootScope.
ngModule.run(function ($rootScope, $state, $stateParams, auth) {
  _.assign($rootScope, {
    _: _,
    $state: $state,
    $stateParams: $stateParams,
    documentTitle: 'ultimate-seed',
    user: auth.getUser()
  });
});

// Loading spinner.
ngModule.run(function ($rootScope, layout) {
  $rootScope.$on('$stateChangeStart', layout.startSpinner);
  $rootScope.$on('$stateChangeSuccess', layout.stopSpinner);
  $rootScope.$on('$stateChangeError', layout.stopSpinner);
});

// Connect to socket.io server.
ngModule.run(function () {
  var retryInterval = 5000,
      retryTimer;

  (function connect() {
    clearInterval(retryTimer);

    var socket = global.socket = socketio.connect('', {
      'force new connection': true,
      'max reconnection attempts': Infinity,
      'reconnection limit': 10 * 1000
    });

    socket.on('connect', function () {
      socket.emit('info', {
        // modernizr: Modernizr,
        navigator: _.transform(navigator, function (result, val, key) {
          if (_.isString(val)) {
            result[key] = val;
          }
        })
      });
    });

    socket.on('test', function (data) {
      console.log(data);
      socket.emit('test', { hello: 'from browser world' });
    });

    retryTimer = setInterval(function () {
      if (!socket.socket.connected &&
          !socket.socket.connecting &&
          !socket.socket.reconnecting) {
        connect();
      }
    }, retryInterval);
  }());
});
