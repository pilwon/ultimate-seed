/*
 * client/js/modules/auth/logout/controller.js
 */

/* global app */

'use strict';

var $ = require('jquery');

var Controller = app.lib.Backbone.Marionette.Controller.extend({
  initialize: function () {
    $.post('/api/logout')
      .done(function () {
        app.config.unset('user');
        app.navigate('', { trigger: true, replace: true });
      })
      .fail(function () {
        console.error('Failed to log out.');
      });
  }
});

// Public API
exports = module.exports = Controller;
