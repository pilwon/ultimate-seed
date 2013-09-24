/*
 * client/js/layout/controllers/_nav.js
 */

'use strict';

exports = module.exports = function (ngModule) {
  ngModule.controller('_NavCtrl', function ($scope, security) {
    $scope.isAdmin = security.isAdmin;
    $scope.isAuthenticated = security.isAuthenticated;
    $scope.isRole = security.isRole;
    $scope.logout = security.logout;
  });
};
