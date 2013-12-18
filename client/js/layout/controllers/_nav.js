/*
 * client/js/layout/controllers/_nav.js
 */

'use strict';

var _ = require('lodash');

var _o;

function logout() {
  _o.layout.startSpinner();
  _o.auth.logout().finally(_o.layout.stopSpinner);
}

exports = module.exports = function (ngModule) {
  ngModule.controller('_NavCtrl', function ($scope, auth, layout) {
    _o = {
      $scope: $scope,
      auth: auth,
      layout: layout
    };

    _.assign($scope, {
      logout: logout
    });
  });
};
