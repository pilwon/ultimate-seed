/*
 * client/js/auth/controllers/login.js
 */

'use strict';

var _ = require('lodash');

var _o;

function login(formMeta) {
  var $scope = _o.$scope,
      alert = _o.alert,
      auth = _o.auth,
      layout = _o.layout,
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

  layout.startSpinner();
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
  ).finally(layout.stopSpinner);
}

exports = module.exports = function (ngModule) {
  ngModule.controller('LoginCtrl', function ($scope, alert, auth, layout) {
    _o = {
      $scope: $scope,
      alert: alert,
      auth: auth,
      layout: layout
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
