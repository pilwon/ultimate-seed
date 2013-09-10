/*
 * client/js/admin/index.js
 */

'use strict';

var angular = require('angular'),
    rhtml = require('rhtml');

var ngModule = angular.module('app.admin', []);

// Routes
ngModule.config(function ($stateProvider) {
  $stateProvider
    .state('app.admin', {
      url: '/admin',
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
