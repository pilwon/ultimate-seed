'use strict';

var angular = require('angular');



angular.module('ngApp.modules.auth', [
  'ngApp.services.security'
]);

require('./authController');
