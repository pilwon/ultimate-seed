/*
 * client/js/app.js
 */

/* global angular */
'use strict';

require('angular');



var app = angular.module('ngApp', [
  'ngCookies',
  'ui.bootstrap',
  'ui.compat'
]);

app.run(function ($rootScope, $state, $stateParams) {
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
});


// Public API
exports = module.exports = app;
