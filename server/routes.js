/*
 * server/routes.js
 */

'use strict';

var ultimate = require('ultimate');

exports.register = function (app) {
  var csrf = ultimate.server.controller.csrf,
      ensureLoggedIn = ultimate.server.controller.ensureLoggedIn,
      ensureLoggedOut = ultimate.server.controller.ensureLoggedOut,
      ensureRole = ultimate.server.controller.ensureRole;

  var c = app.controllers,
      s = app.servers.express.getServer();

  // home
  s.get('/express', c.home.express);

  // Account
  s.get('/account', ensureLoggedIn, c.account.index);

  // Admin
  s.get('/admin', ensureLoggedIn, ensureRole('admin'), c.admin.index);

  // Auth
  s.get('/login', ensureLoggedOut, c.auth.login);
  s.post('/login', ensureLoggedOut, csrf, c.auth.loginPOST);
  s.get('/logout', c.auth.logout);
  s.post('/logout', c.auth.logoutPOST);
  s.get('/lost-password', ensureLoggedOut, c.auth.lostPassword);
  s.post('/lost-password', ensureLoggedOut, csrf, c.auth.lostPasswordPOST);
  s.get('/register', ensureLoggedOut, c.auth.register);
  s.post('/register', ensureLoggedOut, csrf, c.auth.registerPOST);
  s.get('/auth/facebook', c.auth.facebook);
  s.get('/auth/facebook/callback', c.auth.facebookCallback);
  s.get('/auth/facebook/success', c.auth.facebookSuccess);
  s.get('/auth/google', c.auth.google);
  s.get('/auth/google/callback', c.auth.googleCallback);
  s.get('/auth/google/success', c.auth.googleSuccess);
  s.get('/auth/twitter', c.auth.twitter);
  s.get('/auth/twitter/callback', c.auth.twitterCallback);
  s.get('/auth/twitter/success', c.auth.twitterSuccess);

  // Extra routes
  ultimate.server.route.removeTrailingSlash.register(s);
  ultimate.server.route.error404.register(s);
};
