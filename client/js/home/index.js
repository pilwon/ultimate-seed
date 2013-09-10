/*
 * client/js/home/index.js
 */

'use strict';

var angular = require('angular'),
    rhtml = require('rhtml');

var ngModule = angular.module('app.home', []);

// Routes
ngModule.config(function ($stateProvider) {
  $stateProvider
    .state('app.home', {
      url: '/',
      views: {
        '@': {
          template: rhtml('./templates/main.html'),
          controller: 'MainCtrl'
        }
      }
    });
});

// Controllers
require('./controllers/main')(ngModule);
