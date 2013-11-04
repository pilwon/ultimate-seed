/*
 * client/js/shared/services/auth.js
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

function _setUser(userJSON) {
  _clearUser();
  _.assign(_user, userJSON);
}

function getUser() {
  return _user;
}

function isAdmin() {
  return isRole('admin');
}

function isAuthenticated() {
  return !_.isEmpty(_user);
}

function isRole(role) {
  if (!_.isEmpty(_user)) {
    if (role === 'user') {
      return true;
    }
    if (_.isArray(_user.roles) && _.contains(_user.roles, role)) {
      return true;
    }
  } else if (role === 'guest') {
    return true;
  }
  return false;
}

function loadUserFromGlobal() {
  if (_.isPlainObject(global.config)) {
    _setUser(global.config.user);
  }
}

function login(formData) {
  return _injected.$http.post('/api/login', formData).then(function (res) {
    _setUser(res.data.result);
    _injected.$state.go('app.account.summary');
  });
}

function logout() {
  return _injected.$http.post('/api/logout').then(function () {
    _clearUser();
    _injected.$state.go('app.home');
  });
}

// Public API
exports = module.exports = function (ngModule) {
  ngModule.provider('auth', {
    loadUserFromGlobal: loadUserFromGlobal,

    $get: function ($http, $state, $q) {
      _injected = {
        $http: $http,
        $state: $state,
        $q: $q
      };

      return {
        getUser: getUser,
        isAdmin: isAdmin,
        isAuthenticated: isAuthenticated,
        isRole: isRole,
        login: login,
        logout: logout
      };
    }
  });
};
