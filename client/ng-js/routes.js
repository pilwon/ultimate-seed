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

  $stateProvider.state('login', {
    url: '/login',
    views: {
      '': {
        templateUrl: 'js/views/auth/login.tmpl',
        controller: 'AuthController'
      }
    }
  });

  $stateProvider.state('register', {
    url: '/register',
    views: {
      '': {
        templateUrl: 'js/views/auth/register.tmpl',
        controller: 'AuthController'
      }
    }
  });

  $stateProvider.state('account', {
    url: '/account',
    views: {
      '': {
        templateUrl: 'js/views/account/index.tmpl',
        controller: 'AccountController'
      }
    }
  });
});
