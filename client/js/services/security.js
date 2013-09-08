/*
 * client/js/services/auth.js
 */

'use strict';

var angular = require('angular');



var security = angular.module('ngApp.services.security', [
  'ui.compat'  // angular-ui/ui-router
]);

security.provider('security', {
  requireUser: ['security', function (security) {
    return security.requireUser();
  }],

  $get: ['$http', '$location', '$rootScope', '$state', '$q',
      function($http, $location, $rootScope, $state, $q) {
    var service = {};
    service.user = null;

    service.getUser = function() {
      return service.user;
    };

    service.isAuthenticated = function () {
      return !!service.user;
    };

    service.login = function (formData) {
      return $http.post('/api/login', formData).then(function (res) {
        service.user = res.data.result;
        $state.transitionTo('app.account');
      });
    };

    service.logout = function () {
      return $http.post('/api/logout').then(function () {
        service.user = null;
        $state.transitionTo('app.home');
      });
    };

    service.requireUser = function () {
      if (service.user) {
        return $q.when(service.user);
      }

      return $http.get('/api/me').then(function (res) {
        service.user = res.data.result;
        return service.user;
      }, function () {
        // $state.transitionTo('app.login');
        return null;
      });
    };

    return service;
  }]
});
