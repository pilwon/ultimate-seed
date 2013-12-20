/*
 * client/js/account/index.js
 */

'use strict';

var angular = require('angular'),
    rhtml = require('rhtml');

var ngModule = angular.module('app.account', []);

// Controllers
require('./controllers/_layout')(ngModule);
require('./controllers/summary')(ngModule);

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
      controller: 'SummaryCtrl',
      template: rhtml('./templates/summary.html'),
      data: {
        title: 'Summary'
      }
    });
});

// Redirections
ngModule.run(function (route) {
  route.redirect({
    '/account': 'app.account.summary'
  });
});

// Authorizations
ngModule.run(function (auth) {
  auth.authorize({
    'app.account': {
      allow: ['user']
    }
  });
});
