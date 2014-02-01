/*
 * server/index.js
 */

'use strict';

var app = require('koa')(),
    middleware = require('require-all')(__dirname + '/lib/middleware');

// App keys
app.keys = ['UlTiMaTeSeCrEtKeY1', 'UlTiMaTeSeCrEtKeY2'];

// CSRF
require('koa-csrf')(app);

// Error handler
app.on('error', function (err) {
  if (app.env !== 'test') {
    console.log('TODO: Save error to DB - "%s"', err.message);
  }
});

// Response time
app.use(middleware.responseTime);

// Logging
if (app.env === 'development') {
  app.use(require('koa-logger')());
}

// Remove trailing slash
app.use(middleware.removeTrailingSlashes);

// Catch error
app.use(middleware.errorCatch);

// 404 Error
app.use(middleware.error404);

// Attach body parser to ctx
app.use(middleware.attachBodyParser);

// Remove X-Powered-By
app.use(middleware.removePoweredBy);

// Static file middleware
app.use(require('koa-static')(__dirname + '/../static'));

// Handlebars template middleware
app.use(require('koa-hbs').middleware({
  viewPath: __dirname + '/views'
}));

// Session middleware
app.use(require('koa-sess')({
  store: require('koa-redis')({
    prefix: 'koa:sass:'
  })
}));

// Passport middleware
app.use(require('koa-passport').initialize());
app.use(require('koa-passport').session());

// API server
app.use(require('koa-mount')('/', require('./api')));

// DB middleware
app.use(middleware.db);

// Router middleware
app.use(require('koa-router')(app));

// Attach routes
require('./routes')(app);

// Start server
if (!module.parent) {
  app.listen(3000);
  console.log('Listening on port 3000...');
}

// Public API
module.exports = app;

















// /*
//  * server/app.js
//  */

// 'use strict';

// var util = require('util');

// var _ = require('lodash'),
//     ultimate = require('ultimate'),
//     wrench = require('wrench');

// var config = ultimate.config(__dirname + '/../config');

// // Create an app
// var app = {
//   bbq: require('../worker').bbq,
//   config: config,
//   dir: __dirname,
//   project: require('../project'),
//   routes: require('./routes'),
//   servers: {}
// };

// // Assign app to exports
// exports = module.exports = app;

// // Attach winston logger
// wrench.mkdirSyncRecursive(app.project.path.log);
// require('./winston').attach(app);

// // Debug
// app.logger.debug('app.project: '.cyan +
//                  JSON.stringify(app.project, null, 2));
// app.logger.debug(util.format('app.config (%s): ', process.env.NODE_ENV).cyan +
//                  JSON.stringify(app.config, null, 2));

// // Defaults for config
// _.defaults(app.config, {
//   url: app.config.url || 'http://localhost:' + app.project.server.port
// });

// // Load modules
// app.l = app.lib = ultimate.require(app.dir + '/lib');
// app.m = app.models = ultimate.require(app.dir + '/models');
// app.v = app.views = ultimate.fs.globSync(app.dir + '/views/**/*.html');
// app.c = app.controllers = ultimate.require(app.dir + '/controllers');

// // Attach middlewares called by app.servers.koa
// app.attachMiddlewares = function () {
//   // Remove trailing slashes
//   ultimate.server.middleware.removeTrailingSlashes.attach(app);

//   // Method override
//   ultimate.server.middleware.methodOverride.attach(app);

//   // Passport
//   app.servers.koa.getServer().use(ultimate.lib.passport.initialize());
//   app.servers.koa.getServer().use(ultimate.lib.passport.session());

//   // Passport strategies
//   ultimate.server.middleware.passport.facebook.attach(app);
//   ultimate.server.middleware.passport.google.attach(app);
//   ultimate.server.middleware.passport.local.attach(app);
//   ultimate.server.middleware.passport.twitter.attach(app);

//   // Hide Powered-by header
//   ultimate.server.middleware.hidePoweredByHeader.attach(app);

//   // Cache bust
//   ultimate.server.middleware.cachebust.attach(app);

//   // Custom
//   app.servers.koa.getServer().use(function (req, res, next) {
//     if (process.env.NODE_ENV === 'development') {
//       res.locals.livereload = app.project.server.livereload;
//     }
//     res.locals.user = req.user;
//     req.session.ultimate = req.session.ultimate || {};
//     next();
//   });
// };

// app.attachREPLContext = function (context) {
//   context.ld = _;  // _ is taken by REPL.
//   context.ultimate = ultimate;
// };

// // Run app.servers
// app.run = function () {
//   // Connect to DB
//   ultimate.db.mongoose.connect(app.config.db.mongo);
//   ultimate.db.redis.connect(app.config.db.redis);

//   // Start servers
//   ultimate.server.koa.run(app);
//   ultimate.server.http.run(app);
//   ultimate.server.socketio.run(app);
//   ultimate.server.repl.run(app);

//   // Register socket.io handlers
//   require('./socketio').register(app);

//   // Return HTTP server
//   return app.servers.http.getServer();
// };
