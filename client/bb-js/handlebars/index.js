/*
 * client/js/handlebars/index.js
 */

'use strict';

var Handlebars = require('handlebars-runtime');

// Helpers
Handlebars.registerHelper('link', require('./helpers/link'));

// Partials
Handlebars.registerPartial('livereload', require('./partials/livereload.hbs'));
