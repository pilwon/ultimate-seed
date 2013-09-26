/*
 * client/js/auth/controllers/login.js
 */

'use strict';

var _ = require('lodash');

exports = module.exports = function (ngModule) {
  ngModule.controller('LoginCtrl', function ($scope, alert, auth) {
    $scope.focus = {
      username: true
    };
    $scope.showError = false;

    $scope.login = function (formData, formMeta) {
      if (formMeta.$invalid) {
        $scope.showError = true;
        var fields = ['username', 'password'];
        var erroredField = _.find(fields, function (field) {
          return formMeta[field].$invalid;
        });
        $scope.focus[erroredField] = true;
        return;
      }

      auth.login(formData).then(function () {
        $scope.showError = false;
        alert.clearMessages();
      }, function (res) {
        $scope.showError = true;
        alert.setMessages('danger', res.data.result.messages);
      });
    };
  });
};
