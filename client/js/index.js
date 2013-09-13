/*
 * client/js/index.js
 */

'use strict';

// Load dependencies.
require('angular.translate');
require('angular.ui');
require('bootstrap');
require('restangular');

// Register modules.
require('./account');
require('./admin');
require('./auth');
require('./main');
require('./layout');
require('./shared');

// Register app.
require('./app');
