/*
 * client/js/views/nav.js
 */

/* global define */

define([
  'jquery',
  'backbone',
  'hbs!templates/_partials/nav'
], function ($, Backbone, template) {
  'use strict';

  return Backbone.Marionette.ItemView.extend({
    template: template,

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

      return data;
    }
  });
});
