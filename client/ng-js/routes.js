/*
 * client/js/routes.js
 */

/* globals app */
'use strict';


app.config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider
      .otherwise('/');

  $stateProvider.state('index', {
    url: '/',
    views: {
      '': {
        templateUrl: 'js/views/home/index.tmpl',
        controller: 'HomeController'
      }
    }
  });
});
