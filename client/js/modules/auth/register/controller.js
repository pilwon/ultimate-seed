/*
 * client/js/modules/auth/register/controller.js
 */

/* global app */

'use strict';

var _ = require('lodash'),
    $ = require('jquery');

var views = require('./views');

var Controller = app.lib.Backbone.Marionette.Controller.extend({
  initialize: function () {
    var view = this._registerView = new views.RegisterView();

    this.listenTo(view, 'show', function () {
      view.ui.username.focus();
    });

    this.listenTo(view, 'register:clicked', this.onRegisterClick);
    this.listenTo(view, 'login:clicked', this.onLoginClick);

    this.show(view);
  },

  onRegisterClick: function () {
    var view = this._registerView;

    app.execute('hide:alert');
    view.ui.register.button('loading');

    $.post('/api/register', {
      username: view.ui.username.val(),
      password: view.ui.password.val(),
      passwordRepeat: view.ui.passwordRepeat.val(),
      firstName: view.ui.firstName.val(),
      lastName: view.ui.lastName.val()
    })
    .done(function (result) {
      app.config.set('user', result.data);
      app.navigate('', { trigger: true, replace: true });
    })
    .fail(function (response) {
      var result = response.responseJSON;
      app.execute('show:alert', {
        type: 'danger',
        html: '<h4>Registeration Failed</h4><ul>' +
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
      view.ui.register.button('reset');
    });
  },

  onLoginClick: function () {
    app.navigate('login', { trigger: true });
  }
});

// Public API
exports = module.exports = Controller;
