/*
 * client/js/account/index.js
 */

'use strict';

var angular = require('angular'),
    rfile = require('rfile');

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
          template: rfile('./templates/main.html')
        }
      }
    });
});

// Controllers
require('./controllers/main')(ngModule);
