/*
 * client/js/modules/footer/show/controller.js
 */

/* global app */

'use strict';

var $ = require('jquery');

var views = require('./views');

var Controller = app.lib.Backbone.Marionette.Controller.extend({
  initialize: function () {
    var view = this.view = new views.FooterView({
      model: new app.lib.Backbone.Model({
        livereload: ($.cookie('livereload') ? {
          host: location.host.split(':')[0] || 'localhost',
          port: $.cookie('livereload')
        } : void 0)
      })
    });

    this.show(view);
  }
});

// Public API
exports = module.exports = Controller;
