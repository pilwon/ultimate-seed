/*
 * client/js/services/index.js
 */

'use strict';

var angular = require('angular');

require('./security');



angular.module('ngApp.services', [
  'ngApp.services.security'
]);
