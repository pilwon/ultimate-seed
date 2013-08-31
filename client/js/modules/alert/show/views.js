/*
 * client/js/modules/alert/show/views.js
 */

/* global app */

'use strict';

var alertTpl = require('./templates/alert.hbs');

var AlertView = app.lib.Backbone.Marionette.ItemView.extend({
  template: alertTpl
});

// Public API
exports.AlertView = AlertView;
