/*
 * server/routes.js
 */

'use strict';

var c = require('require-all')(__dirname + '/controllers'),
    lib = require('require-all')(__dirname + '/lib');

// var ensureAdmin = ultimate.server.controller.ensureAdmin,
//     ensureGuest = ultimate.server.controller.ensureGuest,
//     ensureUser = ultimate.server.controller.ensureUser,
//     csrf = ultimate.server.controller.csrf;

exports = module.exports = function (app) {
  // API
  // restify.model('/api/features', 'Feature');
  // restify.model('/api/users', 'User');
  // restify.any  ('/api/login', c.api.auth.login, ['post']);
  // restify.any  ('/api/logout', c.api.auth.logout, ['post']);
  // restify.any  ('/api/me', c.api.auth.me, ['list']);
  // restify.any  ('/api/register', c.api.auth.register, ['post']);
  // restify.any  ('/api/test/any', c.api.test, ['list', 'get']);
  // restify.user ('/api/test/user', c.api.test, ['list', 'get']);
  // restify.admin('/api/test/admin', c.api.test);
  // app.get(/^\/api(?:[\/#?].*)?$/, lib.controller.error404);

  // Home
  app.get('/', c.home.index);
  app.get('/koa', c.home.koa);
  app.get('/page', c.home.page);
  app.get('/task', c.home.task);
  app.get('/test/:id?', c.home.test);

  // Auth
  app.get('/auth/facebook', c.auth.facebook);
  app.get('/auth/facebook/callback', c.auth.facebookCallback);
  app.get('/auth/google', c.auth.google);
  app.get('/auth/google/callback', c.auth.googleCallback);
  app.get('/auth/twitter', c.auth.twitter);
  app.get('/auth/twitter/callback', c.auth.twitterCallback);

  // Status
  app.get('/status', c.status.index);
  app.get('/status/health', c.status.health);

  // Catch all
  app.get('*', lib.controller.catchAll);
};
