/*
 * client/js/app.js
 */

/* globals angular */
'use strict';

angular.module('mainApp', [])
  .config(function ($locationProvider, $routeProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
      .when('/', { templateUrl: 'tpl/home/index.html', controller: 'HomeCtrl' })
      .otherwise({ redirectTo: '/' });
  });
