/*
 * client/js/index.js
 */

/* global app */

'use strict';

var _ = require('lodash'),
    $ = require('jquery'),
    Backbone = require('backbone'),
    socketio = require('socketio');

// Setup.
require('./setup');

// Globalize app.
global.app = require('./app');

// Load entities.
require('./entities');

// Configure Handlebars.
require('./handlebars');

// Load modules.
require('./modules/account');
require('./modules/admin');
require('./modules/auth');
require('./modules/footer');
require('./modules/header');
require('./modules/home');
require('./modules/nav');

// Launch app.
$(function () {
  app.globalConfig = global.config || {};

  // Start routers.
  new (Backbone.Router.extend({
    routes: {
      '*notFound': function () {
        if (!app.globalConfig.fromServer) {
          location.replace(app.getRoute());
        } else if (app.globalConfig.notFoundOnServer) {
          location.replace('/404.html');
        } else {
          app.globalConfig.fromServer = false;
        }
      }
    }
  }))();
  app.trigger('start:router');

  // Start app.
  app.start({
    // environment: 'production'
  });

  // Connect to socket.io server.
  (function () {
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
    }.call(this));
  }.call(this));
});
