/*
 * client/js/auth/index.js
 */

'use strict';

var angular = require('angular'),
    rhtml = require('rhtml');

var ngModule = angular.module('app.auth', []);

// Routes
ngModule.config(function ($stateProvider) {
  $stateProvider
    .state('app.login', {
      url: '/login',
      views: {
        '@': {
          controller: 'LoginCtrl',
          template: rhtml('./templates/login.html')
        }
      }
    })
    .state('app.register', {
      url: '/register',
      views: {
        '@': {
          controller: 'RegisterCtrl',
          template: rhtml('./templates/register.html')
        }
      }
    });
});

// Redirections
ngModule.run(function ($location, $rootScope, $state, route) {
  route.redirect($location, $rootScope, $state, {
    '/_=_': {
      state: 'app.account.summary',
      reload: true
    }
  });
});

// Authorizations
ngModule.run(function ($rootScope, $state, auth, route) {
  route.authorize($rootScope, $state, auth, {
    'app.login': {
      deny: ['user'],
      redirect: 'app.account.summary'
    },
    'app.register': {
      deny: ['user'],
      redirect: 'app.account.summary'
    }
  });
});

// Controllers
require('./controllers/login')(ngModule);
require('./controllers/register')(ngModule);
