/*
 * client/js/shared/services/security.js
 */

'use strict';

exports = module.exports = function (ngModule) {
  ngModule.provider('security', {
    requireUser: function (security) {
      return security.requireUser();
    },

    $get: function($http, $state, $q) {
      var service = {
        user: null
      };

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
        });
      };

      return service;
    }
  });
};
