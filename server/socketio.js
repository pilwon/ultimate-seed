/*
 * server/socketio.js
 */

'use strict';

var _socketio = null,
    _connected = false;

function _test(socket) {
  // Server -> Client
  socket.emit('test', {
    hello: 'world'
  });

  // Client -> Server
  socket.on('test', function (data) {
    console.log(data);
  });
}

exports.register = function (app) {
  _socketio = app.servers.socketio.getServer();

  _socketio.enable('browser client minification');
  _socketio.enable('browser client etag');
  _socketio.enable('browser client gzip');
  _socketio.set('log level', 2);
  _socketio.set('transports', [
    'flashsocket',
    'htmlfile',
    'xhr-polling',
    'jsonp-polling'
  ]);

  _socketio.sockets.on('connection', function (socket) {
    _connected = true;

    _test(socket);
  });
};
