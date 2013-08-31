/*
 * client/js/modules/auth/login/controller.js
 */

/* global app */

'use strict';

var _ = require('lodash'),
    $ = require('jquery');

var views = require('./views');

var Controller = app.lib.Backbone.Marionette.Controller.extend({
  initialize: function () {
    var view = this._loginView = new views.LoginView();

    this.listenTo(view, 'show', function () {
      view.ui.username.focus();
    });

    this.listenTo(view, 'login:click', this.onLoginClick);
    this.listenTo(view, 'register:click', this.onRegisterClick);

    this.show(view);
  },

  onLoginClick: function () {
    var view = this._loginView;

    app.execute('hide:alert');
    view.ui.login.button('loading');

    $.post('/api/login', {
      username: view.ui.username.val(),
      password: view.ui.password.val(),
      rememberMe: view.ui.rememberMe.is(':checked')
    })
    .done(function (result) {
      app.config.set('user', result.data);
      app.navigate('', { trigger: true, replace: true });
    })
    .fail(function (response) {
      var result = response.responseJSON;
      app.execute('show:alert', {
        type: 'danger',
        html: '<h4>Login Failed</h4><ul>' +
          _.reduce(result.data.messages, function (html, msg) {
            return html + '<li>' + msg + '</li>';
          }, '') +
          '</ul>'
      });
      if (result.data.focus && _.has(view.ui, result.data.focus)) {
        view.ui[result.data.focus].select().focus();
      } else {
        view.ui.username.focus();
      }
      view.ui.login.button('reset');
    });
  },

  onRegisterClick: function () {
    app.navigate('register', { trigger: true });
  }
});

// Public API
exports = module.exports = Controller;
