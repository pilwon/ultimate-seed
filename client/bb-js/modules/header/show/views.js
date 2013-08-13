/*
 * client/js/modules/header/show/views.js
 */

/* global app */

'use strict';

var headerTpl = require('./templates/header.hbs');

var HeaderView = app.lib.Backbone.Marionette.ItemView.extend({
  template: headerTpl
});

// Public API
exports.HeaderView = HeaderView;
