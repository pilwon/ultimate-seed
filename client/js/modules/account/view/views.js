/*
 * client/js/modules/account/view/views.js
 */

/* global app */

'use strict';

var mainTpl = require('./templates/main.hbs');

var MainView = app.lib.Backbone.Marionette.ItemView.extend({
  template: mainTpl
});

// Public API
exports.MainView = MainView;
