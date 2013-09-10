/*
 * client/js/auth/controllers/login.js
 */

'use strict';

exports = module.exports = function (ngModule) {
  ngModule.controller('LoginCtrl', function ($scope, security) {
    $scope.focus = {
      username: true
    };
    $scope.showError = false;

    $scope.login = function (formData, formMeta) {
      if (formMeta.$invalid) {
        $scope.showError = true;
        return;
      }
      security.login(formData);
    };
  });
};
