/*
 * client/js/status/controllers/status.js
 */

'use strict';

exports = module.exports = function (ngModule) {
  ngModule.controller('StatusCtrl', function ($scope, $http) {
    $scope.status = [];
    $scope.fetch = function() {
      $http.get('/status/health').then(function (res) {
        $scope.status.unshift(res.data);
      });
    };
    $scope.fetch();
  });
};
