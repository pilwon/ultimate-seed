/*
 * server/api/v1/index.js
 */

'use strict';

var app = require('koa')(),
    lib = require('require-all')(__dirname + '/../../lib'),
    mount = require('koa-mount');

// Router middleware
app.use(require('koa-router')(app));

// Attach routes
app.get('/', lib.controller.poweredBy);
app.resource('features', require('./resources/features'));
app.resource('users', require('./resources/users'));

// Public API
module.exports = app;
