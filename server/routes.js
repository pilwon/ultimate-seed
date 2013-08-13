/*
 * server/routes.js
 */

'use strict';

var ultimate = require('ultimate');

exports.register = function (app) {
  var csrf = ultimate.server.controller.csrf,
      ensureAdmin = ultimate.server.controller.ensureAdmin,
      ensureGuest = ultimate.server.controller.ensureGuest,
      ensureUser = ultimate.server.controller.ensureUser;

  var error404 = ultimate.server.route.error404,
      restify = ultimate.server.route.restify;

  var c = app.controllers,
      s = app.servers.express.getServer();

  // Home
  s.get('/express', c.home.express);

  // Account
  s.get('/account', ensureUser, c.account.index);

  // Admin
  s.get('/admin', ensureAdmin, c.admin.index);

  // API
  restify.any(s, '/api/features', c.api.features, ['list', 'get']);
  restify.guest(s, '/api/guest/features', c.api.features, ['list', 'get']);
  restify.user(s, '/api/user/features', c.api.features, ['list', 'get']);
  restify.admin(s, '/api/admin/features', c.api.features);

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

  // Known URLs
  s.get('/test', c.home.index);

  // Unknown URLs
  error404.register(s, app);
};
