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

// Controllers
require('./controllers/login')(ngModule);
require('./controllers/register')(ngModule);
