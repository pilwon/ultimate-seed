/*
 * client/js/account/index.js
 */

'use strict';

var angular = require('angular'),
    rhtml = require('rhtml');

var ngModule = angular.module('app.account', []);

// Routes
ngModule.config(function ($stateProvider, securityProvider) {
  $stateProvider
    .state('app.account', {
      url: '/account',
      resolve: {
        user: securityProvider.requireUser
      },
      views: {
        '@': {
          controller: 'MainCtrl',
          template: rhtml('./templates/main.html')
        }
      }
    });
});

// Controllers
require('./controllers/main')(ngModule);
