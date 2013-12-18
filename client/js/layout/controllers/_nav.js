/*
 * client/js/layout/controllers/_nav.js
 */

'use strict';

var _ = require('lodash');

var _injected;

function logout() {
  _injected.layout.startSpinner();
  _injected.auth.logout().finally(_injected.layout.stopSpinner);
}

exports = module.exports = function (ngModule) {
  ngModule.controller('_NavCtrl', function ($scope, auth, layout) {
    _injected = {
      $scope: $scope,
      auth: auth,
      layout: layout
    };

    _.assign($scope, {
      logout: logout
    });
  });
};
