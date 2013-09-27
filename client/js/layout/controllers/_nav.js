/*
 * client/js/layout/controllers/_nav.js
 */

'use strict';

var _ = require('lodash');

exports = module.exports = function (ngModule) {
  ngModule.controller('_NavCtrl', function ($scope, auth) {
    _.assign($scope, {
      isAdmin: auth.isAdmin,
      isAuthenticated: auth.isAuthenticated,
      isRole: auth.isRole,
      logout: auth.logout
    });
  });
};
