/*
 * server/socketio.js
 */

'use strict';

var util = require('util');

var _socketio = null;

function _test(socket) {
  // Server -> Client
  socket.emit('test', {
    hello: 'from server world'
  });

  // Client -> Server
  socket.on('test', function (data) {
    console.log('[%s] %s', socket.ip, JSON.stringify(data, null, 2));
  });
}

exports.register = function (app) {
  _socketio = app.servers.socketio.getServer();

  _socketio.enable('browser client minification');
  _socketio.enable('browser client etag');
  _socketio.enable('browser client gzip');
  _socketio.set('log level', 2);

  _socketio.sockets.on('connection', function (socket) {
    socket.ip = util.format(
      '%s:%s',
      socket.handshake.address.address,
      socket.handshake.address.port
    );

    console.log('[%s] CONNECTED', socket.ip);

    socket.on('disconnect', function () {
      console.log('[%s] DISCONNECTED', socket.ip);
    });

    _test(socket);
  });
};
