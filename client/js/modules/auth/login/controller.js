/*
 * client/js/modules/auth/login/controller.js
 */

/* global app */

'use strict';

var $ = require('jquery');

var views = require('./views');

var LoginModel = app.lib.Backbone.Model.extend({
  defaults: {
    username: '',
    password: '',
    csrf: '',
    messages: []
  },
  url: '/api/login'
});

var Controller = app.lib.Backbone.Marionette.Controller.extend({
  initialize: function () {
    var loginModel = new LoginModel({
      csrf: $.cookie('csrf')
    });

    var view = new views.LoginView({
      model: loginModel
    });

    this.listenTo(view, 'dom:refresh', function () {
      // view.$('form.login input[name="{{focus}}"]').focus();
      view.$('input[name="username"]').focus();
    });

    this.listenTo(view, 'changed:input', function () {
      view.model.set({
        username: view.$('input[name="username"]').val()
      });
      view.render();
    });

    this.listenTo(view, 'clicked:submit', function () {
      // view.model.save({
      //   username: view.$el.find('#username').val(),
      //   password: view.$el.find('#password').val()
      // }, {
      //   success: function () {
      //     alert('success');
      //   },
      //   error: function () {
      //     alert('fail');
      //   }
      // });
    });

    this.show(view);
  }
});

// Public API
exports = module.exports = Controller;
