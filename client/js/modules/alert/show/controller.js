/*
 * client/js/modules/alert/show/controller.js
 */

/* global app */

'use strict';

var views = require('./views');

var Controller = app.lib.Backbone.Marionette.Controller.extend({
  initialize: function (options) {
    var view = new views.AlertView({
      model: new app.lib.Backbone.Model({
        center: options.center || false,
        container: options.container || true,
        html: options.html || '',
        type: options.type || 'info'
      })
    });

    this.show(view);
  }
});

// Public API
exports = module.exports = Controller;
