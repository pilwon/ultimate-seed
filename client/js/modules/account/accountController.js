/*
 * client/js/modules/account/accountController.js
 */

'use strict';

var angular = require('angular');



// NOTE: Do not have [] as a second argument because it creates a new module.
// We already created the module in index.js.
var account = angular.module('ngApp.modules.account');

account.controller('AccountController', ['$rootScope', 'user',
    function ($rootScope, user) {
  $rootScope.user = user;
}]);
