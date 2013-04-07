/*
 * client/js/views/footer.js
 */

/* global define */

define([
  'jquery',
  'backbone',
  'hbs!templates/_partials/footer'
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

      if ($.cookie('livereload')) {
        data.livereload = {
          host: location.host.split(':')[0] || 'localhost',
          port: $.cookie('livereload')
        };
      }

      return data;
    }
  });
});
