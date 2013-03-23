/*
 * client/js/app.js
 */

/* globals angular */
'use strict';

var ngApp = angular.module('ngApp', ['ngCookies']);

ngApp.config(function ($locationProvider, $routeProvider) {
  // $locationProvider.html5Mode(true);
  $routeProvider
    .when('/', { templateUrl: 'tpl/home/index.html', controller: 'HomeController' })
    .otherwise({ redirectTo: '/' });
});
