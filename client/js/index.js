/*
 * client/js/index.js
 */

'use strict';

var _ = require('lodash'),
    $ = require('jquery'),
    socketio = require('socketio');

// Load dependencies.
require('angular.translate');
require('angular.ui');
require('bootstrap');
require('restangular');

// Register modules.
require('./account');
require('./admin');
require('./auth');
require('./layout');
require('./main');
require('./shared');

// Register app.
require('./app');

// Connect to socket.io server.
$(function () {
  var retryInterval = 5000,
      retryTimer;

  (function connect() {
    clearInterval(retryTimer);

    var socket = global.socket = socketio.connect('', {
      'force new connection': true,
      'max reconnection attempts': Infinity,
      'reconnection limit': 10 * 1000
    });

    socket.on('connect', function () {
      socket.emit('info', {
        // modernizr: Modernizr,
        navigator: _.transform(navigator, function (result, val, key) {
          if (_.isString(val)) {
            result[key] = val;
          }
        })
      });
    });

    socket.on('test', function (data) {
      console.log(data);
      socket.emit('test', { hello: 'from browser world' });
    });

    retryTimer = setInterval(function () {
      if (!socket.socket.connected &&
          !socket.socket.connecting &&
          !socket.socket.reconnecting) {
        connect();
      }
    }, retryInterval);
  }());
});
