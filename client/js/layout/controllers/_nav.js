/*
 * client/js/layout/controllers/_nav.js
 */

'use strict';

var _ = require('lodash');

var _o;

function login() {
  var params;

  if (_o.$state.includes('app.login') || _o.$state.includes('app.register')) {
    params = _o.$location.search();
  } else {
    params = {
      s: _o.$state.current.name
    };
    if (!_.isEmpty(_o.$location.search())) {
      params.sp = JSON.stringify(_o.$location.search());
    }
  }

  _o.$state.go('app.login', params);
}

function logout() {
  _o.layout.startSpinner();
  _o.auth.logout().finally(_o.layout.stopSpinner);
}

function register() {
  var params;

  if (_o.$state.includes('app.register') || _o.$state.includes('app.login')) {
    params = _o.$location.search();
  } else {
    params = {
      s: _o.$state.current.name
    };
    if (!_.isEmpty(_o.$location.search())) {
      params.sp = JSON.stringify(_o.$location.search());
    }
  }

  _o.$state.go('app.register', params);
}

exports = module.exports = function (ngModule) {
  ngModule.controller('_NavCtrl', function ($location, $scope, $state, auth, layout) {
    _o = {
      $location: $location,
      $scope: $scope,
      $state: $state,
      auth: auth,
      layout: layout
    };

    _.assign($scope, {
      login: login,
      logout: logout,
      register: register
    });
  });
};
