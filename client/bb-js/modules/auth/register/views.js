/*
 * client/js/modules/auth/register/views.js
 */

/* global app */

'use strict';

var registerTpl = require('./templates/register.hbs');

var RegisterView = app.lib.Backbone.Marionette.ItemView.extend({
  template: registerTpl,

  triggers: {
    'change input': 'changed:input'
  }
});

// Public API
exports.RegisterView = RegisterView;
