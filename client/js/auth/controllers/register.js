/*
 * client/js/auth/controllers/register.js
 */

'use strict';

var _ = require('lodash');

var _injected;

function register(formMeta) {
  var $scope = _injected.$scope,
      alert = _injected.alert,
      auth = _injected.auth,
      errField,
      fields;

  if (formMeta.$invalid) {
    $scope.showError = true;
    fields = ['username', 'password', 'passwordRepeat', 'firstName'];
    errField = _.find(fields, function (field) {
      return formMeta[field].$invalid;
    });
    $scope.focus[errField] = true;
    return;
  }

  auth.register($scope.formData).then(
    function () {
      $scope.showError = false;
      alert.clearMessages();
      auth.login($scope.formData);
    },
    function (res) {
      if (res.data.error && res.data.error.message) {
        $scope.showError = true;
        alert.setMessages('danger', res.data.error.message);
      } else {
        throw new Error('Failed to register.');
      }
    }
  );
}

exports = module.exports = function (ngModule) {
  ngModule.controller('RegisterCtrl', function ($scope, alert, auth) {
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
      register: register,
      showError: false
    });
  });
};
