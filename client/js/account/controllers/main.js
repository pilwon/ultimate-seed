/*
 * client/js/account/controllers/main.js
 */

'use strict';

exports = module.exports = function (ngModule) {
  ngModule.controller('MainCtrl', function ($rootScope, user) {
    $rootScope.user = user;
  });
};
