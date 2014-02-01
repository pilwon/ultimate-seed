/*
 * server/api/index.js
 */

'use strict';

var app = require('koa')(),
    lib = require('require-all')(__dirname + '/../lib'),
    mount = require('koa-mount'),
    v1 = require('./v1');

// DB middleware
app.use(lib.middleware.db);

// Router middleware
app.use(require('koa-router')(app));

// Embedded API server
if (module.parent) {
  app.use(mount('/api', v1));
}

// Stand-alone API server
else {
  app.get('/', lib.controller.poweredBy);
  app.use(mount('/v1', v1));
  // app.use(mount('/v2', v2));
  // app.use(mount('/v3', v3));
  // ...
}

// Start server
if (!module.parent) {
  app.listen(3000);
  console.log('Listening on port 3000...');
}

// Public API
module.exports = app;
