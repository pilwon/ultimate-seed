/*
 * client/js/controllers/navController.js
 */

'use strict';

var angular = require('angular');



// NOTE: Do not have [] as a second argument because it creates a new module.
// We already created the module in index.js.
var nav = angular.module('ngApp.modules.nav');

nav.controller('NavController', ['$scope', 'security',
    function ($scope, security) {
  $scope.isAuthenticated = security.isAuthenticated;
  $scope.logout = security.logout;
}]);
