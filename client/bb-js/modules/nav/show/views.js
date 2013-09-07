/*
 * client/js/modules/nav/show/views.js
 */

/* global app */

'use strict';

var navTpl = require('./templates/nav.hbs');

var NavView = app.lib.Backbone.Marionette.ItemView.extend({
  template: navTpl,
  triggers: {
    'click a[href="/account"]': 'account:clicked',
    'click a[href="/login"]': 'login:clicked',
    'click a[href="/logout"]': 'logout:clicked',
    'click a[href="/register"]': 'register:clicked'
  }
});

// Public API
exports.NavView = NavView;
