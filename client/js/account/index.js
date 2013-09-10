/*
 * client/js/account/index.js
 */

'use strict';

var angular = require('angular'),
    rfile = require('rfile');

var ngModule = angular.module('app.account', []);

// Routes
ngModule.config(function ($stateProvider, securityProvider) {
  $stateProvider.state('app.account', {
    url: '/account',
    resolve: {
      user: securityProvider.requireUser
    },
    views: {
      '@': {
        template: rfile('./templates/main.html'),
        controller: 'MainCtrl'
      }
    }
  });
});

// Controllers
require('./controllers/main')(ngModule);
