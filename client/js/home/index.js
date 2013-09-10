/*
 * client/js/home/index.js
 */

'use strict';

var angular = require('angular'),
    rfile = require('rfile');

var ngModule = angular.module('app.home', []);

// Routes
ngModule.config(function ($stateProvider) {
  $stateProvider.state('app.home', {
    url: '/',
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
