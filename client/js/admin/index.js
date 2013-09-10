/*
 * client/js/admin/index.js
 */

'use strict';

var angular = require('angular'),
    rfile = require('rfile');

var ngModule = angular.module('app.admin', []);

// Routes
ngModule.config(function ($stateProvider) {
  $stateProvider
    .state('app.admin', {
      url: '/admin',
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
