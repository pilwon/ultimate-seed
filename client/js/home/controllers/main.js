/*
 * client/js/home/controllers/main.js
 */

'use strict';

exports = module.exports = function (ngModule) {
  ngModule.controller('MainCtrl', function ($http, $scope) {
    $scope.items = $http.get('/api/features').then(function (res) {
      return res.data.result;
    });
  });
};
