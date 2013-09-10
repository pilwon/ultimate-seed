/*
 * client/js/layout/index.js
 */

'use strict';

var angular = require('angular'),
    rhtml = require('rhtml');

var ngModule = angular.module('app.layout', []);

// Routes
ngModule.config(function ($stateProvider) {
  $stateProvider
    .state('app', {
      abstract: true,
      views: {
        'alert': {
          controller: 'AlertCtrl',
          template: rhtml('./templates/alert.html')
        },
        'footer': {
          controller: 'FooterCtrl',
          template: rhtml('./templates/footer.html')
        },
        'header': {
          controller: 'HeaderCtrl',
          template: rhtml('./templates/header.html')
        },
        'nav': {
          controller: 'NavCtrl',
          template: rhtml('./templates/nav.html')
        }
      }
    });
});

// Controllers
require('./controllers/alert')(ngModule);
require('./controllers/footer')(ngModule);
require('./controllers/header')(ngModule);
require('./controllers/nav')(ngModule);
