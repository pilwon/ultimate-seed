/*
 * client/js/app.js
 */

/* globals angular */
'use strict';

var ngApp = angular.module('ngApp', [
  'ngCookies',
  'ui.bootstrap',
  'ui.compat'
]);

ngApp.config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider
      .otherwise('/');

  $stateProvider.state('index', {
    url: '/',
    templateUrl: 'views/home/index.html',
    controller: 'HomeController'
  });
});
