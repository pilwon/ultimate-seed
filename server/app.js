/*
 * server/app.js
 */

'use strict';

var util = require('util');

var _ = require('lodash'),
    mkdirp = require('mkdirp'),
    ultimate = require('ultimate');

var config = ultimate.config(__dirname + '/../config');

// Create an app
var app = {
  config: config,
  dir: __dirname,
  project: require('../project'),
  routes: require('./routes'),
  servers: {}
};

// Assign app to exports
exports = module.exports = app;

// Attach winston logger
mkdirp.sync(app.project.path.log);
require('./winston').attach(app);

// Debug
app.logger.debug('app.project: '.cyan +
                 JSON.stringify(app.project, null, 2));
app.logger.debug(util.format('app.config (%s): ', process.env.NODE_ENV).cyan +
                 JSON.stringify(app.config, null, 2));

// Defaults for config
_.defaults(app.config, {
  url: app.config.url || 'http://localhost:' + app.project.server.port
});

// Load modules
app.m = app.models = ultimate.require(app.dir + '/models');
app.v = app.views = ultimate.fs.globSync(app.dir + '/views/**/*.html');
app.c = app.controllers = ultimate.require(app.dir + '/controllers');
app.l = app.lib = ultimate.require(app.dir + '/lib');

// Attach middlewares called by app.servers.express
app.attachMiddlewares = function () {
  // Remove trailing slashes
  ultimate.server.middleware.removeTrailingSlashes.attach(app);

  // Attach session middleware
  if (_.isObject(app.config.session) && _.isObject(app.config.session.store)) {
    switch (ultimate.server.middleware.session._use(app.config, ['mongo', 'redis'])) {
    case 'mongo':
      app.logger.debug('app.config.session.store.mongo: '.cyan +
                       JSON.stringify(app.config.session.store.mongo, null, 2));
      ultimate.server.middleware.session.mongo.attach(app);
      break;
    case 'redis':
      app.logger.debug('app.config.session.store.redis: '.cyan +
                       JSON.stringify(app.config.session.store.redis, null, 2));
      ultimate.server.middleware.session.redis.attach(app);
      break;
    default:
      throw new Error('Missing session.store.{mongo,redis} in config');
    }
  } else {
    throw new Error('Missing object in config: session.store');
  }

  // Generate CSRF token
  app.servers.express.getServer().use(function (req, res, next) {
    if (!req.session._csrf) {
      req.session._csrf = ultimate.util.uuid({ length: 24, dash: false });
    }
    next();
  });

  // Method override
  ultimate.server.middleware.methodOverride.attach(app);

  // Passport
  app.servers.express.getServer().use(ultimate.lib.passport.initialize());
  app.servers.express.getServer().use(ultimate.lib.passport.session());

  // Passport strategies
  ultimate.server.middleware.passport.facebook.attach(app);
  ultimate.server.middleware.passport.google.attach(app);
  ultimate.server.middleware.passport.local.attach(app);
  ultimate.server.middleware.passport.twitter.attach(app);

  // Hide Powered-by header
  ultimate.server.middleware.hidePoweredByHeader.attach(app);

  // Custom
  app.servers.express.getServer().use(function (req, res, next) {
    // Locals
    res.locals.livereload = process.env.LIVERELOAD;
    res.locals.csrf = req.session._csrf;
    res.locals.user = req.user;
    res.locals.role = {
      admin: false
    };

    // User cookie
    if (!req.user) {
      app.lib.cookie.clearUserCookie(req, res);
    } else {
      app.lib.cookie.setUserCookie(req, res);
    }

    // Live reload
    if (process.env.LIVERELOAD) {
      res.cookie('livereload', process.env.LIVERELOAD);
    } else {
      res.clearCookie('livereload');
    }

    next();
  });
};

app.attachREPLContext = function (context) {
  context.ld = _;  // _ is taken by REPL.
  context.ultimate = ultimate;
};

// Run app.servers
app.run = function () {
  // Connect to DB
  ultimate.db.mongoose.connect(app.config.db.mongo);
  ultimate.db.redis.connect(app.config.db.redis);

  // Start servers
  ultimate.server.express.run(app);
  ultimate.server.http.run(app);
  ultimate.server.socketio.run(app);
  ultimate.server.repl.run(app);

  // Register socket.io handlers
  require('./socketio').register(app);

  // Return HTTP server
  return app.servers.http.getServer();
};
