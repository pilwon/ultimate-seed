/*
 * server/socketio.js
 */

'use strict';

exports.register = function (app) {
  var s = app.servers.socketio.getServer();

  s.sockets.on('connection', function (socket) {
    socket.emit('hello', { hello: 'world' });
    socket.on('test', function (data) {
      console.log(data);
    });
  });
};
