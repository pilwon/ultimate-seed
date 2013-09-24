/*
 * client/js/layout/controllers/nav.js
 */

'use strict';

exports = module.exports = function (ngModule) {
  ngModule.controller('NavCtrl', function ($scope, security) {
    $scope.isAuthenticated = security.isAuthenticated;
    $scope.logout = security.logout;
  });
};
