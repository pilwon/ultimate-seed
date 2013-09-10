/*
 * client/js/layout/index.js
 */

'use strict';

var angular = require('angular'),
    rfile = require('rfile');

var ngModule = angular.module('app.layout', []);

// Routes
ngModule.config(function ($stateProvider) {
  $stateProvider
    .state('app', {
      abstract: true,
      views: {
        'alert': {
          controller: 'AlertCtrl',
          template: rfile('./templates/alert.html')
        },
        'footer': {
          controller: 'FooterCtrl',
          template: rfile('./templates/footer.html')
        },
        'header': {
          controller: 'HeaderCtrl',
          template: rfile('./templates/header.html')
        },
        'nav': {
          controller: 'NavCtrl',
          template: rfile('./templates/nav.html')
        }
      }
    });
});

// Controllers
require('./controllers/alert')(ngModule);
require('./controllers/footer')(ngModule);
require('./controllers/header')(ngModule);
require('./controllers/nav')(ngModule);
