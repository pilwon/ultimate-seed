/*
 * server/socketio.js
 */

'use strict';

var sockets = require('./sockets');

var _socketio = null;

exports.register = function (app) {
  _socketio = app.servers.socketio.getServer();

  _socketio.set('log level', 2);

  _socketio.sockets.on('connection', function (socket) {
    // Attach variables.
    socket.address = socket.handshake.address.address + ':' +
                     socket.handshake.address.port;
    socket.connectedAt = new Date();

    // Call onMessage.
    // (function () {
    //   var onMessage = socket.manager.transports[socket.id].onMessage;
    //   socket.manager.transports[socket.id].onMessage = function (packet) {
    //     onMessage.apply(this, arguments);
    //     sockets.onMessage(socket, packet);
    //   };
    // }());

    // Call onDisconnect.
    socket.on('disconnect', function () {
      sockets.onDisconnect(socket);
      console.info('[%s] DISCONNECTED', socket.address);
    });

    // Call onConnect.
    sockets.onConnect(socket);
    console.info('[%s] CONNECTED', socket.address);
  });
};
