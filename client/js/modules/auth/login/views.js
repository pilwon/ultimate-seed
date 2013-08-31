/*
 * client/js/modules/auth/login/views.js
 */

/* global app */

'use strict';

var loginTpl = require('./templates/login.hbs');

var LoginView = app.lib.Backbone.Marionette.ItemView.extend({
  template: loginTpl,

  ui: {
    username: 'input[name="username"]',
    password: 'input[name="password"]',
    rememberMe: 'input[name="rememberMe"]',
    login: '.btn-login',
    register: '.btn-regsiter'
  },

  triggers: {
    'click .btn-login': 'login:click',
    'click .btn-register': 'register:click'
  }
});

// Public API
exports.LoginView = LoginView;
