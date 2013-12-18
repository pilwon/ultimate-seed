/*
 * client/js/layout/controllers/_nav.js
 */

'use strict';

var _ = require('lodash');

var _o;

function login() {
  var params;

  if (_o.$state.includes('app.login') || _o.$state.includes('app.register')) {
    params = _o.$rootScope.$stateParams;
  } else {
    params = {
      s: _o.$state.current.name
    };
    if (!_.isEmpty(_o.$rootScope.$stateParams)) {
      params.sp = JSON.stringify(_o.$rootScope.$stateParams);
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
    params = _o.$rootScope.$stateParams;
  } else {
    params = {
      s: _o.$state.current.name
    };
    if (!_.isEmpty(_o.$rootScope.$stateParams)) {
      params.sp = JSON.stringify(_o.$rootScope.$stateParams);
    }
  }

  _o.$state.go('app.register', params);
}

exports = module.exports = function (ngModule) {
  ngModule.controller('_NavCtrl', function ($rootScope, $scope, $state, auth, layout) {
    _o = {
      $rootScope: $rootScope,
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
