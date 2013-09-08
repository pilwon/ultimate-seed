/*
 * client/js/configs/routes.js
 */

/* globals app */
'use strict';

var url = require('url');



app.config(['$locationProvider', '$stateProvider', '$urlRouterProvider', 'securityProvider',
    function ($locationProvider, $stateProvider, $urlRouterProvider, securityProvider) {
  $locationProvider.html5Mode(true);

  $stateProvider.state('app', {
    abstract: true,
    views: {
      'nav': {
        templateUrl: '/js/modules/nav/nav.tmpl',
        controller: 'NavController'
      },
      'alert': {
        templateUrl: '/js/modules/alert/alert.tmpl',
        controller: 'AlertController'
      },
      'header': {
        templateUrl: '/js/modules/header/header.tmpl'
      },
      'footer': {
        templateUrl: '/js/modules/footer/footer.tmpl'
      }
    }
  });

  $stateProvider.state('app.home', {
    url: '/',
    views: {
      '@': {
        templateUrl: '/js/modules/home/index.tmpl',
        controller: 'HomeController'
      }
    }
  });

  $stateProvider.state('app.login', {
    url: '/login',
    views: {
      '@': {
        templateUrl: '/js/modules/auth/login.tmpl',
        controller: 'AuthController'
      }
    }
  });

  $stateProvider.state('app.register', {
    url: '/register',
    views: {
      '@': {
        templateUrl: '/js/modules/auth/register.tmpl',
        controller: 'AuthController'
      }
    }
  });

  $stateProvider.state('app.account', {
    url: '/account',
    resolve: {
      user: securityProvider.requireUser
    },
    views: {
      '@': {
        templateUrl: '/js/modules/account/index.tmpl',
        controller: 'AccountController'
      }
    }
  });

  global.config = global.config || {};
  $urlRouterProvider.otherwise(function () {
    if (!global.config.fromServer) {
      global.location.replace(url.parse(global.location.href).path);
    } else if (global.config.notFoundOnServer) {
      global.location.replace('/404.html');
    } else {
      global.config.fromServer = false;
    }
  });
}]);
