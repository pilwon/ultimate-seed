/*
 * client/js/modules/footer/show/views.js
 */

/* global app */

'use strict';

var footerTpl = require('./templates/footer.hbs');

var FooterView = app.lib.Backbone.Marionette.ItemView.extend({
  template: footerTpl
});

// Public API
exports.FooterView = FooterView;
