/*
 * client/js/services/index.js
 */

'use strict';

var angular = require('angular');

require('./alert');
require('./security');



angular.module('ngApp.services', [
  'ngApp.services.alert',
  'ngApp.services.security'
]);
