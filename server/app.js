/*
 * server/app.js
 */

'use strict';

var util = require('util');

var _ = require('lodash'),
    ultimate = require('ultimate'),
    wrench = require('wrench');

var config = ultimate.config(__dirname + '/../config');

// Create an app
var app = {
  bbq: require('../worker').bbq,
  config: config,
  dir: __dirname,
  project: require('../project'),
  routes: require('./routes'),
  servers: {}
};

// Assign app to exports
exports = module.exports = app;

// Attach winston logger
wrench.mkdirSyncRecursive(app.project.path.log);
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
app.l = app.lib = ultimate.require(app.dir + '/lib');
app.m = app.models = ultimate.require(app.dir + '/models');
app.v = app.views = ultimate.fs.globSync(app.dir + '/views/**/*.html');
app.c = app.controllers = ultimate.require(app.dir + '/controllers');

// Attach middlewares called by app.servers.express
app.attachMiddlewares = function () {
  // Remove trailing slashes
  ultimate.server.middleware.removeTrailingSlashes.attach(app);

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

  // Cache bust
  ultimate.server.middleware.cachebust.attach(app);

  // Custom
  app.servers.express.getServer().use(function (req, res, next) {
    if (process.env.NODE_ENV === 'development') {
      res.locals.livereload = app.project.server.livereload;
    }
    res.locals.user = req.user;
    req.session.ultimate = req.session.ultimate || {};
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
