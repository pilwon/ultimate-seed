/*
 * server/socketio/users.js
 */

'use strict';

function _onNew(/*socket, data, cb*/) {
  // console.log('=== users:create ===');
  // console.log(data);

  // var user = {
  //   id: nextId++
  // };

  // users[user.id] = user;

  // socket.emit('users:create', user);
  // socket.broadcast.emit('users:create', user);

  // cb(null, user);
}

function _onFetch(/*socket, data, cb*/) {
  // console.log('=== users:read ===');
  // console.log(data);

  // cb(null, _.values(user));
}

function _onSave(/*socket, data, cb*/) {
  // console.log('=== users:update ===');
  // console.log(data);

  // var user = users[data.id] = data;

  // socket.emit('users/' + data.id + ':update', user);
  // socket.broadcast.emit('users/' + data.id + ':update', user);

  // cb(null, user);
}

function _onDestroy(/*socket, data, cb*/) {
  // console.log('=== users:delete ===');
  // console.log(data);

  // var user = users[data.id];

  // socket.emit('users/' + data.id + ':delete', user);
  // socket.broadcast.emit('users/' + data.id + ':delete', user);

  // cb(null, user);
}

function register(socket) {
  socket.on('users:create', function (data, cb) {
    _onNew(socket, data, cb);
  });
  socket.on('users:read', function (data, cb) {
    _onFetch(socket, data, cb);
  });
  socket.on('users:update', function (data, cb) {
    _onSave(socket, data, cb);
  });
  socket.on('users:delete', function (data, cb) {
    _onDestroy(socket, data, cb);
  });
}

// Public API
exports.register = register;
