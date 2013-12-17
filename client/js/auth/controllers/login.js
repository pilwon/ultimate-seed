/*
 * client/js/auth/controllers/login.js
 */

'use strict';

var _ = require('lodash');

var _injected;

function login(formMeta) {
  var $scope = _injected.$scope,
      alert = _injected.alert,
      auth = _injected.auth,
      errField,
      fields;

  if (formMeta.$invalid) {
    $scope.showError = true;
    fields = ['username', 'password'];
    errField = _.find(fields, function (field) {
      return formMeta[field].$invalid;
    });
    $scope.focus[errField] = true;
    return;
  }

  auth.login($scope.formData).then(
    function () {
      $scope.showError = false;
      alert.clearMessages();
    }, function (res) {
      if (res.data.error && res.data.error.message) {
        $scope.showError = true;
        alert.setMessages('danger', res.data.error.message);
      } else {
        throw new Error('Failed to login.');
      }
    }
  );
}

exports = module.exports = function (ngModule) {
  ngModule.controller('LoginCtrl', function ($scope, alert, auth) {
    _injected = {
      $scope: $scope,
      alert: alert,
      auth: auth
    };

    _.assign($scope, {
      focus: {
        username: true
      },
      formData: {},
      login: login,
      showError: false
    });
  });
};
