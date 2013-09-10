/*
 * client/js/auth/controllers/register.js
 */

'use strict';

exports = module.exports = function (ngModule) {
  ngModule.controller('RegisterCtrl', function ($http, $scope, alertService, security) {
    $scope.showError = false;

    $scope.register = function (formData, formMeta) {
      if (formMeta.$invalid) {
        $scope.showError = true;
        return;
      }
      $http.post('/api/register', formData).then(function () {
        $scope.showError = false;
        security.login(formData);
      }, function (res) {
        $scope.showError = true;
        alertService.addError(res.data.error.message);
      });
    };
  });
};
