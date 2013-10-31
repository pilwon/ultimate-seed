/*
 * client/js/main/index.js
 */

'use strict';

var angular = require('angular'),
    rhtml = require('rhtml');

var module = 'app.main';

var ngModule = angular.module(module, []);


// Routes
ngModule.config(function ($stateProvider) {
  $stateProvider
    .state('app.home', {
      url: '/',
      views: {
        '@': {
          template: rhtml('./templates/home.html'),
          controller: 'HomeCtrl'
        }
      },
      resolve: {
        features: ['$http', function ($http) {
          return $http.get('/api/features').then(function (res) {
            return res.data.result;
          });
        }]
      }
    });
});

// Controllers
require('./controllers/home')(ngModule);

// Dependency
require('../dependency')({
  module: module
});
