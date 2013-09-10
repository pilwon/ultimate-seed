/*
 * client/js/layout/controllers/alert.js
 */

'use strict';

exports = module.exports = function (ngModule) {
  ngModule.controller('AlertCtrl', function ($scope, alert) {
    $scope.alerts = alert.getMessages();
    $scope.closeAlert = alert.removeMessage;
  });
};
