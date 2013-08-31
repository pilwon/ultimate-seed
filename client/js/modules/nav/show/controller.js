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
        user: app.config.get('user')
      })
    });

    this.listenTo(app.config, 'change:user', function () {
      view.model.set('user', app.config.get('user'));
      view.render();
    });

    this.listenTo(view, 'account:click', function () {
      app.navigate('account', { trigger: true, refresh: true });
    });

    this.listenTo(view, 'logout:click', function () {
      app.navigate('logout', { trigger: true, refresh: true });
    });

    this.listenTo(view, 'login:click', function () {
      app.navigate('login', { trigger: true, refresh: true });
    });

    this.listenTo(view, 'register:click', function () {
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
