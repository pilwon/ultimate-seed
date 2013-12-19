/*
 * client/js/account/controllers/summary.js
 */

'use strict';

var _ = require('lodash');

exports = module.exports = function (ngModule) {
  ngModule.controller('SummaryCtrl', function ($scope, auth) {
    _.assign($scope, {
      loginFacebook: auth.loginFacebook,
      loginGoogle: auth.loginGoogle,
      loginTwitter: auth.loginTwitter
    });
  });
};
