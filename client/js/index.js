/*
 * client/js/index.js
 */

'use strict';

// Load dependencies.
require('angular.animate');
require('angular.translate');
require('angular.ui');
require('bootstrap');
require('jquery.center');
require('jquery.spin');
require('restangular');

// Register modules.
// careful, order is important @see https://github.com/angular-ui/ui-router/issues/486
// these modules will be integrated into the main module in this order! @see ./dependency.js
require('./shared');
require('./layout');
require('./account');
require('./admin');
require('./auth');
require('./status');
require('./main');




// Register app.
require('./app');
