/*
 * client/js/layout/controllers/_alert.js
 */

'use strict';

exports = module.exports = function (ngModule) {
  ngModule.controller('_AlertCtrl', function ($scope, alert) {
    $scope.alerts = alert.getMessages();
    $scope.closeAlert = alert.removeMessage;
  });
};
