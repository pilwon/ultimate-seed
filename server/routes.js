/*
 * server/routes.js
 */

'use strict';

function registerRoutes(app) {
  var c = require('./controllers');

	app.get('/hello', c.home.hello);
}

// Public API
exports.registerRoutes = registerRoutes;
