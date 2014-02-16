/*
 * server/sockets/index.js
 */

'use strict';

function _onInfo(socket, data) {
  console.info('[%s] %s', socket.address, JSON.stringify(data, null, 2));
}

function _register(socket) {
  socket.on('info', function (data) {
    _onInfo(socket, data);
  });

  require('./test').register(socket);
  // require('./users').register(socket);
}

function onConnect(socket) {
  _register(socket);
}

function onDisconnect(/*socket*/) {
  //...
}

function onMessage(/*socket, packet*/) {
  // if (packet.type === 'heartbeat') {
  //   // ...
  // }
}

// Public API
exports.onConnect = onConnect;
exports.onDisconnect = onDisconnect;
exports.onMessage = onMessage;
