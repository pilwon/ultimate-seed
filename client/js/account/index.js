/*
 * client/js/account/index.js
 */

'use strict';

var angular = require('angular'),
    rhtml = require('rhtml');

var ngModule = angular.module('app.account', []);

// Routes
ngModule.config(function ($stateProvider) {
  $stateProvider
    .state('app.account', {
      abstract: true,
      url: '/account',
      views: {
        '@': {
          controller: '_LayoutCtrl',
          template: rhtml('./templates/_layout.html')
        }
      },
      data: {
        menuTitle: 'Account'
      }
    })
    .state('app.account.summary', {
      url: '/summary',
      views: {
        '@app.account': {
          controller: 'SummaryCtrl',
          template: rhtml('./templates/summary.html')
        }
      },
      data: {
        title: 'Summary'
      }
    });
});

// Redirections
ngModule.run(function ($location, $rootScope, $state, route) {
  route.redirect($location, $rootScope, $state, {
    '/account': 'app.account.summary'
  });
});

// Authorizations
ngModule.run(function ($rootScope, $state, auth, route) {
  route.authorize($rootScope, $state, auth, {
    'app.account': {
      allow: ['user']
    }
  });
});

// Controllers
require('./controllers/_layout')(ngModule);
require('./controllers/summary')(ngModule);
