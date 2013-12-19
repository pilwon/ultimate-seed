/*
 * server/routes.js
 */

'use strict';

// var ultimate = require('ultimate');

// Register controllers to routes.
exports.register = function (app, restify) {
  var c = app.controllers,
      s = app.servers.express.getServer(),
      error404 = app.lib.controller.error404;

  // var ensureAdmin = ultimate.server.controller.ensureAdmin,
  //     ensureGuest = ultimate.server.controller.ensureGuest,
  //     ensureUser = ultimate.server.controller.ensureUser,
  //     csrf = ultimate.server.controller.csrf;

  // API
  restify.model('/api/features', 'Feature');
  restify.model('/api/users', 'User');
  restify.any  ('/api/login', c.api.auth.login, ['post']);
  restify.any  ('/api/logout', c.api.auth.logout, ['post']);
  restify.any  ('/api/me', c.api.auth.me, ['list']);
  restify.any  ('/api/register', c.api.auth.register, ['post']);
  restify.any  ('/api/test/any', c.api.test, ['list', 'get']);
  restify.user ('/api/test/user', c.api.test, ['list', 'get']);
  restify.admin('/api/test/admin', c.api.test);
  s.get(/^\/api(?:[\/#?].*)?$/, error404);

  // Home
  s.get('/', c.home.index);
  s.get('/express', c.home.express);
  s.get('/page', c.home.page);
  s.get('/task', c.home.task);

  // Auth
  s.get('/auth/facebook', c.auth.facebook);
  s.get('/auth/facebook/callback', c.auth.facebookCallback);
  s.get('/auth/google', c.auth.google);
  s.get('/auth/google/callback', c.auth.googleCallback);
  s.get('/auth/twitter', c.auth.twitter);
  s.get('/auth/twitter/callback', c.auth.twitterCallback);

  // Status
  s.get('/status', c.status.index);
  s.get('/status/health', c.status.health);

  // Catch all
  s.get('*', app.lib.controller.catchAll);
};
