/*
 * server/app.js
 */

'use strict';

// System modules.
var http = require('http'),
    path = require('path');

// Installed modules.
var express = require('express'),
    hbs = require('hbs'),
    socketio = require('socket.io');

// Project modules.
var project = require('../project'),
    routes = require('./routes');

// Module variables.
var app = express(),
    server = http.createServer(app),
    io = socketio.listen(server);

// SocketIO.
io.sockets.on('connection', function (socket) {
  socket.emit('hello', { hello: 'world' });
  socket.on('test', function (data) {
    console.log(data);
  });
});

// Express configuration.
app.configure(function () {
  app.set('port', process.env.PORT || project.server.port);
  app.engine('html', hbs.__express);
  app.set('view engine', 'html');
  app.set('views', __dirname + '/views');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.static(path.join(__dirname, '..', project.path.temp)));
  app.use(express.static(path.join(__dirname, '..', project.path.client)));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
});

// Express configuration for development.
app.configure('development', function () {
  app.use(express.errorHandler());
});

// Express configuration for production.
app.configure('production', function () {
  app.use(express.errorHandler());
});

// Register routes.
routes.registerRoutes(app);

server.listen(app.get('port'), function () {
  console.log('Server listening on port ' + app.get('port'));
});

// Proxy use() for grunt-express.
server.use = function () {
  app.use.apply(app, arguments);
};

// Public API
exports = module.exports = server;
