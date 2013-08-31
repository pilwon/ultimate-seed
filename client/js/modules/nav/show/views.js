/*
 * client/js/modules/nav/show/views.js
 */

/* global app */

'use strict';

var S = require('string');

var navTpl = require('./templates/nav.hbs');

var NavView = app.lib.Backbone.Marionette.ItemView.extend({
  template: navTpl,

  triggers: {
    'click a[href="/account"]': 'account:click',
    'click a[href="/logout"]': 'logout:click',
    'click a[href="/login"]': 'login:click',
    'click a[href="/register"]': 'register:click'
  },

  serializeData: function () {
    var data = {};

    if (this.model) {
      data = this.model.toJSON();
    } else if (this.collection) {
      data = {
        items: this.collection.toJSON()
      };
    }

    // Attach class="active" to link to current route.
    var classVar = S('class_' + app.getRoute().replace(/\//g, '_')).camelize().s;
    if (classVar === 'class') { classVar += 'Backbone'; }
    data[classVar] = 'active';

    return data;
  }
});

// Public API
exports.NavView = NavView;
