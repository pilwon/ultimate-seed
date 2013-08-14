/*
 * client/js/controllers/navController.js
 */

/* globals app */
'use strict';


app.controller('NavController', function ($scope, $cookies) {
  $scope.user = {
    name: {
      full: $cookies['user.name.full']
    }
  };
});
