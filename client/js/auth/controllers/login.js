/*
 * client/js/auth/controllers/login.js
 */

'use strict';

var _ = require('lodash');

var _o;

function login(formMeta) {
  var errField,
      fields;

  if (formMeta.$invalid) {
    _o.$scope.showError = true;
    fields = ['username', 'password'];
    errField = _.find(fields, function (field) {
      return formMeta[field].$invalid;
    });
    _o.$scope.focus[errField] = true;
    return;
  }

  _o.layout.startSpinner();
  _o.auth.login(_o.$scope.formData).then(
    function () {
      _o.$scope.showError = false;
      _o.alert.clearMessages();
    },
    function (res) {
      if (res.data.error && res.data.error.message) {
        _o.$scope.showError = true;
        _o.alert.setMessages('danger', res.data.error.message);
      } else {
        throw new Error('Failed to login.');
      }
    }
  ).finally(_o.layout.stopSpinner);
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
      loginFacebook: auth.loginFacebook,
      loginGoogle: auth.loginGoogle,
      loginTwitter: auth.loginTwitter,
      showError: false
    });
  });
};
