/*
 * client/js/layout/controllers/_nav.js
 */

'use strict';

var _ = require('lodash');

var _injected;

function logout() {
  _injected.auth.logout();
}

exports = module.exports = function (ngModule) {
  ngModule.controller('_NavCtrl', function ($scope, auth) {
    _injected = {
      $scope: $scope,
      auth: auth
    };

    _.assign($scope, {
      logout: logout
    });
  });
};
