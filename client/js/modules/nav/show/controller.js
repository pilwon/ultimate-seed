/*
 * client/js/modules/nav/show/controller.js
 */

/* global app */

'use strict';

var Backbone = require('backbone');

var views = require('./views');

var Controller = app.lib.Backbone.Marionette.Controller.extend({
  initialize: function () {
    var view = new views.NavView({
      model: new app.lib.Backbone.Model({
        user: ($.cookie('user.name.full') ? {
          name: {
            full: $.cookie('user.name.full')
          }
        } : void 0)
      })
    });

    view.on('clicked:login', function (args) {
      app.navigate('login', { trigger: true, refresh: true });
    });

    view.on('clicked:register', function (args) {
      app.navigate('register', { trigger: true, refresh: true });
    });

    Backbone.history.on('route', function () {
      view.render();
    });

    this.show(view);
  }
});

// Public API
exports = module.exports = Controller;
