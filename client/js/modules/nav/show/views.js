/*
 * client/js/modules/nav/show/views.js
 */

/* global app */

'use strict';

var navTpl = require('./templates/nav.hbs');

var NavView = app.lib.Backbone.Marionette.ItemView.extend({
  template: navTpl,
  triggers: {
    'click a[href="/account"]': 'account:click',
    'click a[href="/login"]': 'login:click',
    'click a[href="/logout"]': 'logout:click',
    'click a[href="/register"]': 'register:click'
  }
});

// Public API
exports.NavView = NavView;
