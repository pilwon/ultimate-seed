/*
 * client/js/shared/services/appSocket.js
 */

'use strict';

var io = require('socketio');

function appSocket(socketFactory) {
  var connect = io.connect('', {
    'force new connection': true,
    'max reconnection attempts': Infinity,
    'reconnection limit': 10 * 1000
  });

  return socketFactory({
    ioSocket: connect
  });
}

// Public API
exports = module.exports = function (ngModule) {
  ngModule.factory('appSocket', function (socketFactory) {

    return appSocket(socketFactory);
  });
};
