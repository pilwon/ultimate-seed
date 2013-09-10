/*
 * client/js/auth/controllers/register.js
 */

'use strict';

var _ = require('lodash');

exports = module.exports = function (ngModule) {
  ngModule.controller('RegisterCtrl', function ($http, $scope, alert, security) {
    $scope.focus = {
      username: true
    };
    $scope.showError = false;

    $scope.register = function (formData, formMeta) {
      if (formMeta.$invalid) {
        $scope.showError = true;
        var fields = ['username', 'password', 'passwordRepeat', 'firstName'];
        var erroredField = _.find(fields, function (field) {
          return formMeta[field].$invalid;
        });
        $scope.focus[erroredField] = true;
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
