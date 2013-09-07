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

    service.isAuthenticated = function () {
      return !!service.user;
    };

    service.login = function (formData, callback) {
      $http.post('/api/login', formData).success(function (data) {
        service.user = data.result;
        $state.transitionTo('account');
      }).error(function (data) {
        if (callback) {
          callback(data);
        }
      });
    };

    service.logout = function () {
      $http.post('/api/logout').success(function () {
        $state.transitionTo('index');
      });
    };

    service.requireUser = function () {
      if (service.user) {
        return $q.when(service.user);
      }

      // TODO: Handle this when the backend is properly implemented.
      var request = $http.post('/api/users/');
      return request.then(function (response) {
        if (response.status === 200 && response.result) {
          service.user = response.result[0];
          return service.user;
        } else {
          $state.transitionTo('login');
        }
      });
    };

    return service;
  }]
});
