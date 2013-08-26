/*
 * client/js/routes.js
 */

/* globals app */
'use strict';


app.config(function ($stateProvider, $urlRouterProvider, securityProvider) {
  $urlRouterProvider
      .otherwise('/');

  $stateProvider.state('index', {
    url: '/',
    views: {
      '': {
        templateUrl: 'js/modules/home/index.tmpl',
        controller: 'HomeController'
      }
    }
  });

  $stateProvider.state('login', {
    url: '/login',
    views: {
      '': {
        templateUrl: 'js/modules/auth/login.tmpl',
        controller: 'AuthController'
      }
    }
  });

  $stateProvider.state('register', {
    url: '/register',
    views: {
      '': {
        templateUrl: 'js/modules/auth/register.tmpl',
        controller: 'AuthController'
      }
    }
  });

  $stateProvider.state('account', {
    url: '/account',
    resolve: {
      user: securityProvider.requireUser
    },
    views: {
      '': {
        templateUrl: 'js/modules/account/index.tmpl',
        controller: 'AccountController'
      }
    }
  });
});
