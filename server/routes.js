/*
 * server/routes.js
 */

'use strict';

var ultimate = require('ultimate');

// Register controllers to routes.
exports.register = function (app, restify) {
  var csrf = ultimate.server.controller.csrf,
      ensureAdmin = ultimate.server.controller.ensureAdmin,
      ensureGuest = ultimate.server.controller.ensureGuest,
      ensureUser = ultimate.server.controller.ensureUser;

  var c = app.controllers,
      s = app.servers.express.getServer(),
      error404 = app.lib.controller.error404;

  // API
  restify.model('/api/features', 'Feature');
  restify.model('/api/users', 'User');
  restify.any  ('/api/login', c.api.auth.login, ['post']);
  restify.any  ('/api/logout', c.api.auth.logout, ['post']);
  restify.any  ('/api/register', c.api.auth.register, ['post']);
  restify.any  ('/api/test/any', c.api.test, ['list', 'get']);
  restify.user ('/api/test/user', c.api.test, ['list', 'get']);
  restify.admin('/api/test/admin', c.api.test);
  s.get(/^\/api(?:[\/#?].*)?$/, error404);

  // Home
  s.get('/', app.lib.controller.index);
  s.get('/express', c.home.express);

  // Account
  s.get('/account', ensureUser, c.account.index);

  // Admin
  s.get('/admin', ensureAdmin, c.admin.index);
  s.get(/^\/admin(?:[\/#?].*)?$/, error404);

  // Auth
  s.get('/login', ensureGuest, c.auth.login);
  s.post('/login', csrf, c.auth.loginPOST);
  s.get('/logout', c.auth.logout);
  s.post('/logout', c.auth.logoutPOST);
  s.get('/lost-password', ensureGuest, c.auth.lostPassword);
  s.post('/lost-password', csrf, c.auth.lostPasswordPOST);
  s.get('/register', ensureGuest, c.auth.register);
  s.post('/register', csrf, c.auth.registerPOST);
  s.get('/auth/facebook', c.auth.facebook);
  s.get('/auth/facebook/callback', c.auth.facebookCallback);
  s.get('/auth/facebook/success', c.auth.facebookSuccess);
  s.get('/auth/google', c.auth.google);
  s.get('/auth/google/callback', c.auth.googleCallback);
  s.get('/auth/google/success', c.auth.googleSuccess);
  s.get('/auth/twitter', c.auth.twitter);
  s.get('/auth/twitter/callback', c.auth.twitterCallback);
  s.get('/auth/twitter/success', c.auth.twitterSuccess);

  // Catch all
  s.get('*', c.home.index);
};
