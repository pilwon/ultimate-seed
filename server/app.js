/*
 * server/app.js
 */

'use strict';

var fs = require('fs'),
    net = require('net'),
    path = require('path'),
    repl = require('repl'),
    util = require('util');

var _ = require('lodash'),
    mkdirp = require('mkdirp'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    ultimate = require('ultimate');

// Set default NODE_ENV
if (!_.isString(process.env.NODE_ENV)) {
  process.env.NODE_ENV = 'development';
}

// Create an app
var app = {
  config: require(path.join('../config', process.env.NODE_ENV)),
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
  url: app.config.url || 'http://localhost: ' + app.project.server.port
});

// Patch mongoose for convenient access.
mongoose.customPlugin = ultimate.db.mongoose.plugin;
mongoose.customType = ultimate.db.mongoose.type;

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
  app.servers.express.getServer().use(passport.initialize());
  app.servers.express.getServer().use(passport.session());

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

// Attach REPL to the process so that server admin can be ready for chaos.
// It's called by app.run
app.attachREPL = function() {
  // If the unix socket still exists, delete it before listening to it.
  // Otherwise, you will get 'Error: listen EADDRINUSE'.
  if (fs.existsSync(app.config.repl.socket)) {
    fs.unlinkSync(app.config.repl.socket);
  }

  net.createServer(function(socket) {
    var replInst = repl.start({
      input: socket,
      output: socket,
      prompt: 'ultimate> '
    }).on('exit', function() {
      socket.end();
    });

    // Expose some variables to the REPL.
    replInst.context.app = app;
    // Named it 'ld' because '_' contains the result of the last expression in REPL
    replInst.context.ld = _;
    replInst.context.ultimate = ultimate;
  }).listen(app.config.repl.socket);
};

// Run app.servers
app.run = function () {
  // Connect to DB
  ultimate.db.mongo.connect(app);
  ultimate.db.redis.connect(app);

  // Start servers
  ultimate.server.express.run(app);
  ultimate.server.http.run(app);
  ultimate.server.socketio.run(app);

  // Register socket.io handlers
  require('./socketio').register(app);

  // Attach REPL
  app.attachREPL();

  // Return HTTP server
  return app.servers.http.getServer();
};
