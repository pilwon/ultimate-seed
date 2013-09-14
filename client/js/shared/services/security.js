/*
 * client/js/shared/services/security.js
 */

'use strict';

var _ = require('lodash');

var _injected = {},
    _user = {};

function _clearUser() {
  _.each(_user || {}, function(v, k) {
    delete _user[k];
  });
}

function _setUser(user) {
  _clearUser();
  _.assign(_user, user);
}

function getUser() {
  return _user;
}

function isAuthenticated() {
  return !_.isEmpty(_user);
}

function login(formData) {
  return _injected.$http.post('/api/login', formData).then(function (res) {
    _setUser(res.data.result);
    _injected.$state.transitionTo('app.account');
  });
}

function logout() {
  return _injected.$http.post('/api/logout').then(function () {
    _clearUser();
    _injected.$state.transitionTo('app.home');
  });
}

function requireUser() {
  if (_user) {
    return _injected.$q.when(_user);
  }
  return _injected.$http.get('/api/me').then(function (res) {
    _setUser(res.data.result);
    return _user;
  });
}

exports = module.exports = function (ngModule) {
  ngModule.provider('security', {
    requireUser: function (security) {
      return security.requireUser();
    },

    $get: function ($http, $state, $q) {
      _injected = {
        $http: $http,
        $state: $state,
        $q: $q
      };

      return {
        getUser: getUser,
        isAuthenticated: isAuthenticated,
        login: login,
        logout: logout,
        requireUser: requireUser
      };
    }
  });
};
