/*
 * client/js/auth/index.js
 */

'use strict';

var angular = require('angular'),
    rfile = require('rfile');

var ngModule = angular.module('app.auth', []);

// Routes
ngModule.config(function ($stateProvider) {
  $stateProvider.state('app.login', {
    url: '/login',
    views: {
      '@': {
        template: rfile('./templates/login.html'),
        controller: 'LoginCtrl'
      }
    }
  });
  $stateProvider.state('app.register', {
    url: '/register',
    views: {
      '@': {
        template: rfile('./templates/register.html'),
        controller: 'RegisterCtrl'
      }
    }
  });
});

// Controllers
require('./controllers/login')(ngModule);
require('./controllers/register')(ngModule);
