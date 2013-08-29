/*
 * server/sockets/test.js
 */

'use strict';

function _clientToServer(socket) {
  socket.on('test', function (data) {
    console.log('[%s] %s', socket.address, JSON.stringify(data, null, 2));
  });
}

function _serverToClient(socket) {
  socket.emit('test', {
    hello: 'from server world'
  });
}

function register(socket) {
  _clientToServer(socket);
  _serverToClient(socket);
}

// Public API
exports.register = register;
