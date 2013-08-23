/*
 * client/js/controllers/authController.js
 */

/* globals app */
'use strict';


app.controller('AuthController', function ($scope) {
  $scope.login = function(formData) {
    console.log(formData);
  };

  $scope.register = function(formData) {
    console.log(formData);
  };
});
