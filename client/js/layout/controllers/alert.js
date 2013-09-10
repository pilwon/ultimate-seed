/*
 * client/js/layout/controllers/alert.js
 */

'use strict';

exports = module.exports = function (ngModule) {
  ngModule.controller('AlertCtrl', function ($scope, alertService) {
    $scope.alerts = alertService.getMessages();
    $scope.closeAlert = alertService.removeMessage;
  });
};
