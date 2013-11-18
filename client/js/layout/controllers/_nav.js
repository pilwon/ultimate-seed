/*
 * client/js/layout/controllers/_nav.js
 */

'use strict';

var _ = require('lodash');

exports = module.exports = function (ngModule) {
  ngModule.controller('_NavCtrl', function ($scope, app) {
    _.assign($scope, {
      isAdmin: app.auth.isAdmin,
      isAuthenticated: app.auth.isAuthenticated,
      isRole: app.auth.isRole,
      logout: app.auth.logout
    });
  });
};
