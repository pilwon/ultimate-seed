/*
 * client/js/socketio.js
 */

/* global define */

define([
  'underscore',
  'vent'
], function (_, vent) {
  'use strict';

  var _socket = null;

  function _init() {
    // Create script tag.
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = '/socket.io/socket.io.js';
    script.async = false;
    script.defer = false;

    // Insert script tag.
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(script, s);
  }

  function _setup() {
    var socket = _socket;

    // Server -> Client
    socket.on('test', function (data) {
      vent.trigger('socketio:received', data);

      // Client -> Server
      socket.emit('test', {
        hello: 'world'
      });
    });
  }

  function connect() {
    (function connectWhenReady() {
      if (_.isUndefined(window.io)){
        window.setTimeout(connectWhenReady, 100);
      } else {
        _socket = window.io.connect();
        _setup();
      }
    }());
  }

  _init();

  return {
    connect: connect,
    socket: _socket
  };
});
