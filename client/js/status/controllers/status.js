/*
 * client/js/main/controllers/home.js
 */

'use strict';

exports = module.exports = function (ngModule) {
  ngModule.controller('StatusCtrl', function ($scope, $http) {
    $scope.status = [];
    var index = 0;
    $scope.fetch = function() {
      $http.get('/status/health').then(function (res) {
        $scope.status[index++] = res.data;
        return res.data;
      });
    };
    $scope.fetch();
  });
};
