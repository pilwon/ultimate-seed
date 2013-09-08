/*
 * client/js/modules/home/homeController.js
 */

'use strict';

var angular = require('angular');



// NOTE: Do not have [] as a second argument because it creates a new module.
// We already created the module in index.js.
var home = angular.module('ngApp.modules.home');

home.controller('HomeController', ['$http', '$scope',
    function ($http, $scope) {
  $scope.items = $http.get('/api/features').then(function (resp) {
    return resp.data.result;
  });
}]);
