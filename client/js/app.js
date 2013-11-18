/*
 * client/js/app.js
 */

'use strict';

var _ = require('lodash'),
    angular = require('angular'),
    moment = require('moment'),
    socketio = require('socketio');

var ngModule = angular.module('app', [
  'ngAnimate',
  'ngCookies',
  'ngSanitize',
  'pascalprecht.translate',
  'restangular',
  'ui.bootstrap',
  'ui.router',
  'app.shared',
  'app.layout',
  'app.account',
  'app.admin',
  'app.auth',
  'app.status',
  'app.main'
]);

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
        if (_.isPlainObject(global.config) && !!global.config.catchAll) {
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
    moment: moment,
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
