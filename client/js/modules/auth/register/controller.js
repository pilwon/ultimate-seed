/*
 * client/js/modules/auth/register/controller.js
 */

/* global app */

'use strict';

var $ = require('jquery');

var views = require('./views');

var Controller = app.lib.Backbone.Marionette.Controller.extend({
  initialize: function () {
    var view = new views.RegisterView({
      model: new app.lib.Backbone.Model({
        csrf: $.cookie('csrf'),
        messages: [],
        username: '',
        firstName: '',
        lastName: ''
      })
    });

    view.on('dom:refresh', function () {
      // view.$('form.login input[name="{{focus}}"]').focus();
      view.$('input[name="username"]').focus();
    });

    view.on('changed:input', function () {
      view.model.set({
        username: view.$('input[name="username"]').val(),
        firstName: view.$('input[name="firstName"]').val(),
        lastName: view.$('input[name="lastName"]').val()
      });
      view.render();
    });

    this.show(view);
  }
});

// Public API
exports = module.exports = Controller;
