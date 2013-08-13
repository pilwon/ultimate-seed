/*
 * client/js/modules/footer/show/views.js
 */

/* global app */

'use strict';

var $ = require('jquery');

var footerTpl = require('./templates/footer.hbs');

var FooterView = app.lib.Backbone.Marionette.ItemView.extend({
  template: footerTpl,

  serializeData: function () {
    var data = {};

    if (this.model) {
      data = this.model.toJSON();
    } else if (this.collection) {
      data = {
        items: this.collection.toJSON()
      };
    }

    if ($.cookie('livereload')) {
      data.livereload = {
        host: location.host.split(':')[0] || 'localhost',
        port: $.cookie('livereload')
      };
    }

    return data;
  }
});

// Public API
exports.FooterView = FooterView;
