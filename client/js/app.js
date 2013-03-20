/*
 * client/js/app.js
 */

'use strict';

/* globals angular */
angular.module('mainApp', [])
  .config(function ($locationProvider, $routeProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
      .when('/', { templateUrl: 'tpl/home/index.html', controller: 'HomeCtrl' })
      .otherwise({ redirectTo: '/' });
  });
