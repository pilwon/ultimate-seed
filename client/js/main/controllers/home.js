/*
 * client/js/main/controllers/home.js
 */

'use strict';

exports = module.exports = function (ngModule) {
  ngModule.controller('HomeCtrl', function ($http, $scope) {
    $scope.items = $http.get('/api/features').then(function (res) {
      return res.data.result;
    });
  });
};
