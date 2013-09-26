/*
 * client/js/layout/controllers/_nav.js
 */

'use strict';

exports = module.exports = function (ngModule) {
  ngModule.controller('_NavCtrl', function ($scope, auth) {
    $scope.isAdmin = auth.isAdmin;
    $scope.isAuthenticated = auth.isAuthenticated;
    $scope.isRole = auth.isRole;
    $scope.logout = auth.logout;
  });
};
