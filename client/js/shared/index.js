/*
 * client/js/shared/index.js
 */

'use strict';

var angular = require('angular');

var ngModule = angular.module('app.shared', []);

// Constants
ngModule.constant('VERSION', '1.0');

// Services
require('./services/alert')(ngModule);
require('./services/security')(ngModule);
