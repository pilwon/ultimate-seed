/*
 * client/js/modules/alert/alertController.js
 */

'use strict';

var angular = require('angular');



// NOTE: Do not have [] as a second argument because it creates a new module.
// We already created the module in index.js.
var alert = angular.module('ngApp.modules.alert');

alert.controller('AlertController', ['$scope', 'alertService',
    function ($scope, alertService) {
  $scope.alerts = alertService.getMessages();
  $scope.closeAlert = alertService.removeMessage;
}]);
