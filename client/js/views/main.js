/*
 * client/js/views/main.js
 */

/* global define */

define([
  'jquery',
  'backbone',
  'views/_layouts/home',
  'views/footer',
  'views/header',
  'views/nav',
  'hbs!templates/main'
], function ($, Backbone, HomeLayoutView,
             FooterView, HeaderView, NavView,
             template) {
  'use strict';

  return Backbone.Marionette.Layout.extend({
    template: template,

    regions: {
      headerRegion: '#header',
      navRegion: '#nav',
      contentRegion: '#content',
      footerRegion: '#footer'
    },

    onShow: function () {
      this.headerRegion.show(new HeaderView());
      this.navRegion.show(new NavView());
      this.contentRegion.show(new HomeLayoutView());
      this.footerRegion.show(new FooterView());
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
