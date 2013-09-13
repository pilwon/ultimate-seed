/*
 * client/js/shared/services/security.js
 */

'use strict';

var _ = require('lodash');

exports = module.exports = function (ngModule) {
  ngModule.provider('security', {
    requireUser: function (security) {
      return security.requireUser();
    },

    $get: function($http, $state, $q) {
      var service = {
        user: {}
      };

      var _clearUser = function () {
        _.each(service.user, function(v, k) { delete service.user[k]; });
      };

      var _setUser = function (user) {
        _clearUser();
        _.assign(service.user, user);
      };

      service.getUser = function() {
        return service.user;
      };

      service.isAuthenticated = function () {
        return !_.isEmpty(service.user);
      };

      service.login = function (formData) {
        return $http.post('/api/login', formData).then(function (res) {
          _setUser(res.data.result);
          $state.transitionTo('app.account');
        });
      };

      service.logout = function () {
        return $http.post('/api/logout').then(function () {
          _clearUser();
          $state.transitionTo('app.home');
        });
      };

      service.requireUser = function () {
        if (service.user) {
          return $q.when(service.user);
        }

        return $http.get('/api/me').then(function (res) {
          _setUser(res.data.result);
          return service.user;
        });
      };

      return service;
    }
  });
};
