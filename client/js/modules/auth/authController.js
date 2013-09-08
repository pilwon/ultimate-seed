/*
 * client/js/modules/auth/authController.js
 */

'use strict';

var angular = require('angular');



// NOTE: Do not have [] as a second argument because it creates a new module.
// We already created the module in index.js.
var auth = angular.module('ngApp.modules.auth');

auth.controller('AuthController', ['$http', '$scope', 'alertService', 'security',
    function ($http, $scope, alertService, security) {
  $scope.showError = false;

  $scope.login = function (formData, formMeta) {
    if (formMeta.$invalid) {
      $scope.showError = true;
      return;
    }
    security.login(formData);
  };

  $scope.register = function (formData, formMeta) {
    if (formMeta.$invalid) {
      $scope.showError = true;
      return;
    }
    $http.post('/api/register', formData).then(function () {
      $scope.showError = false;
      security.login(formData);
    }, function (resp) {
      $scope.showError = true;
      alertService.addError(resp.data.error.message);
    });
  };
}]);
