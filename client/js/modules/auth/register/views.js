/*
 * client/js/modules/auth/register/views.js
 */

/* global app */

'use strict';

var registerTpl = require('./templates/register.hbs');

var RegisterView = app.lib.Backbone.Marionette.ItemView.extend({
  template: registerTpl,

  ui: {
    username: 'input[name="username"]',
    password: 'input[name="password"]',
    passwordRepeat: 'input[name="passwordRepeat"]',
    firstName: 'input[name="firstName"]',
    lastName: 'input[name="lastName"]',
    register: '.btn-regsiter',
    login: '.btn-login'
  },

  triggers: {
    'click .btn-register': 'register:clicked',
    'click .btn-login': 'login:clicked'
  }
});

// Public API
exports.RegisterView = RegisterView;
