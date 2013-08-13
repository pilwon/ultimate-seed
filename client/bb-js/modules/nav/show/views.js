/*
 * client/js/modules/nav/show/views.js
 */

/* global app */

'use strict';

var S = require('string'),
    $ = require('jquery'),
    Backbone = require('backbone');

var navTpl = require('./templates/nav.hbs');

var NavView = app.lib.Backbone.Marionette.ItemView.extend({
  template: navTpl,

  initialize: function () {
    Backbone.history.on('route', function () {
      this.render();
    }, this);
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

    if ($.cookie('user.name.full')) {
      data.user = {
        name: {
          full: $.cookie('user.name.full')
        }
      };
    }

    // Attach class="active" to link to current route.
    var classVar = S('class_' + app.getUrl().pathname.replace(/\//g, '_')).camelize().s;
    if (classVar === 'class') { classVar += 'Backbone'; }
    data[classVar] = 'active';

    return data;
  }
});

// Public API
exports.NavView = NavView;
