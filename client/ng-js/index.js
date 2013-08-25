/*
 * client/js/index.js
 */

'use strict';

require('jquery');
require('bootstrap');

// Globalize app.
global.app = require('./app');

require('./values');
require('./directives');
require('./filters');
require('./services');
require('./modules');

require ('./routes');
