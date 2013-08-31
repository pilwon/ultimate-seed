/*
 * client/js/modules/account/view/controller.js
 */

/* global app */

'use strict';

var views = require('./views');

var Controller = app.lib.Backbone.Marionette.Controller.extend({
  initialize: function () {
    var view = new views.MainView({
      model: new app.lib.Backbone.Model({
        user: app.config.get('user')
      })
    });

    this.listenTo(app.config, 'change:user', function () {
      view.model.set('user', app.config.get('user'));
      view.render();
    });

    this.show(view);
  }
});

// Public API
exports = module.exports = Controller;
