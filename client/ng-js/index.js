/*
 * client/js/index.js
 */

 /* globals app */
 'use strict';

// Globalize app.
global.app = require('./app');

require('./controllers');
require('./directives');
require('./filters');
require('./services');

require ('./routes');
