/*
 * client/js/auth/controllers/register.js
 */

'use strict';

exports = module.exports = function (ngModule) {
  ngModule.controller('RegisterCtrl', function ($http, $scope, alert, security) {
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
        alert.addError(res.data.error.message);
      });
    };
  });
};
