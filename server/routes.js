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

  var error404 = ultimate.server.route.error404;

  var c = app.controllers,
      s = app.servers.express.getServer();

  // Home
  s.get('/express', c.home.express);

  // Account
  s.get('/account', ensureUser, c.account.index);

  // Admin
  s.get('/admin', ensureAdmin, c.admin.index);

  // API
  restify.model('/api/features', 'Feature');
  restify.model('/api/users', 'User');
  restify.any('/api/login', c.api.auth.login, ['post']);
  restify.any('/api/logout', c.api.auth.logout, ['post']);
  restify.any('/api/register', c.api.auth.register, ['post']);
  restify.guest('/api/test', c.api.test, ['list', 'get']);
  restify.user('/api/test/user', c.api.test, ['list', 'get']);
  restify.admin('/api/test/admin', c.api.test);

  // Auth
  s.get('/login', ensureGuest, c.auth.login);
  s.post('/login', ensureGuest, csrf, c.auth.loginPOST);
  s.get('/logout', c.auth.logout);
  s.post('/logout', c.auth.logoutPOST);
  s.get('/lost-password', ensureGuest, c.auth.lostPassword);
  s.post('/lost-password', ensureGuest, csrf, c.auth.lostPasswordPOST);
  s.get('/register', ensureGuest, c.auth.register);
  s.post('/register', ensureGuest, csrf, c.auth.registerPOST);
  s.get('/auth/facebook', c.auth.facebook);
  s.get('/auth/facebook/callback', c.auth.facebookCallback);
  s.get('/auth/facebook/success', c.auth.facebookSuccess);
  s.get('/auth/google', c.auth.google);
  s.get('/auth/google/callback', c.auth.googleCallback);
  s.get('/auth/google/success', c.auth.googleSuccess);
  s.get('/auth/twitter', c.auth.twitter);
  s.get('/auth/twitter/callback', c.auth.twitterCallback);
  s.get('/auth/twitter/success', c.auth.twitterSuccess);

  // Blacklist (404.html)
  s.get(/^\/api(?:[\/#?].*)?$/, c.home.error404);

  // Whitelist (index.html)
  s.get('*', c.home.index);

  // Catch all (404.html)
  error404.register(s, app);
};
