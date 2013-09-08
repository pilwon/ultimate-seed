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
        $state.transitionTo('account');
      });
    };

    service.logout = function () {
      return $http.post('/api/logout').then(function () {
        $state.transitionTo('index');
      });
    };

    service.requireUser = function () {
      if (service.user) {
        return $q.when(service.user);
      }

      return $http.post('/api/me').then(function (res) {
        if (res.status === 200 && res.result) {
          service.user = res.result[0];
          return service.user;
        } else {
          $state.transitionTo('login');
        }
      }, function () {
        return null;
      });
    };

    return service;
  }]
});
