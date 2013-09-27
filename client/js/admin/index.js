/*
 * client/js/admin/index.js
 */

'use strict';

var angular = require('angular'),
    rhtml = require('rhtml');

var ngModule = angular.module('app.admin', []);

// Routes
ngModule.config(function ($stateProvider, authProvider) {
  $stateProvider
    .state('app.admin', {
      abstract: true,
      url: '/admin',
      resolve: {
        user: authProvider.requireUser
      },
      views: {
        '@': {
          controller: '_LayoutCtrl',
          template: rhtml('./templates/_layout.html')
        }
      }
    })
    .state('app.admin.dashboard', {
      url: '/dashboard',
      views: {
        '@app.admin': {
          controller: 'DashboardCtrl',
          template: rhtml('./templates/dashboard.html')
        }
      }
    });
});

// Redirections
ngModule.run(function ($rootScope, $state, route) {
  route.redirect($rootScope, $state, {
    '/admin': 'app.admin.dashboard'
  });
});

// Authorizations
ngModule.run(function ($rootScope, $state, auth, route) {
  route.authorize($rootScope, $state, auth, {
    'app.admin': {
      allow: ['admin']
    }
  });
});

// Controllers
require('./controllers/_layout')(ngModule);
require('./controllers/dashboard')(ngModule);
