/*
 * client/js/layout/index.js
 */

'use strict';

var angular = require('angular'),
    rfile = require('rfile');

var ngModule = angular.module('app.layout', []);

// Routes
ngModule.config(function ($stateProvider) {
  $stateProvider.state('app', {
    abstract: true,
    views: {
      'alert': {
        template: rfile('./templates/alert.html'),
        controller: 'AlertCtrl'
      },
      'footer': {
        template: rfile('./templates/footer.html')
      },
      'header': {
        template: rfile('./templates/header.html')
      },
      'nav': {
        template: rfile('./templates/nav.html'),
        controller: 'NavCtrl'
      }
    }
  });
});

// Controllers
require('./controllers/alert')(ngModule);
require('./controllers/footer')(ngModule);
require('./controllers/header')(ngModule);
require('./controllers/nav')(ngModule);
