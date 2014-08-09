/*
 * client/js/testmodule/index.js
 */

'use strict';

var angular = require('angular'),
    rhtml = require('rhtml');

var ngModule = angular.module('app.testmodule', []);

// Controllers
require('./controllers/_layout')(ngModule);


// Routes
ngModule.config(function ($stateProvider) {
  $stateProvider
    .state('app.testmodule', {
      abstract: true,
      url: '/testmodule',
      views: {
        '@': {
          controller: '_LayoutCtrl',
          template: rhtml('./templates/_layout.html')
        }
      },
      data: {
        menuTitle: '/*module_name_f_u*/'
      }
    });
});

