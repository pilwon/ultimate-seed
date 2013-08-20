/*
 * client/js/modules/auth/login/views.js
 */

/* global app */

'use strict';

var loginTpl = require('./templates/login.hbs');

var LoginView = app.lib.Backbone.Marionette.ItemView.extend({
  template: loginTpl,

  triggers: {
    'change input': 'changed:input',
    'click button[type="submit"]': 'clicked:submit'
  }
});

// Public API
exports.LoginView = LoginView;
