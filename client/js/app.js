/*
 * client/js/app.js
 */

/* globals angular */
'use strict';

var ngApp = angular.module('ngApp', ['ngCookies']);

ngApp.config(function ($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', { templateUrl: 'views/home/index.html', controller: 'HomeController' })
    .otherwise({ redirectTo: '/' });

  $locationProvider.html5Mode(true);
});
