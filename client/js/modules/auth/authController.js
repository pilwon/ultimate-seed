/*
 * client/js/controllers/authController.js
 */

'use strict';

var angular = require('angular');



// NOTE: Do not have [] as a second argument because it creates a new module.
// We already created the module in index.js.
var auth = angular.module('ngApp.modules.auth');

auth.controller('AuthController', ['$http', '$scope', 'security',
    function ($http, $scope, security) {
  $scope.login = function (formData) {
    security.login(formData, function () {
      console.log('Error logging in.');
    });
  };

  $scope.register = function (formData) {
    console.log(formData);
  };
}]);
