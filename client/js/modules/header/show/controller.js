/*
 * client/js/modules/header/show/controller.js
 */

/* global app */

'use strict';

var views = require('./views');

var Controller = app.lib.Backbone.Marionette.Controller.extend({
  initialize: function () {
    this.show(new views.HeaderView());
  }
});

// Public API
exports = module.exports = Controller;
