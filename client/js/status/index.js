/*
 * client/js/status/index.js
 */

'use strict';

var angular = require('angular'),
    rhtml = require('rhtml');

var module = 'app.status';

var ngModule = angular.module(module, []);


// Routes
ngModule.config(function ($stateProvider) {
  $stateProvider
    .state('app.status', {
      url: '/app-status',
      views: {
        '@': {
          template: rhtml('./templates/status.html'),
          controller: 'StatusCtrl'
        }
      }
    });
});

// Controllers
require('./controllers/status')(ngModule);

// Dependency
require('../dependency')({
  module: module
});
