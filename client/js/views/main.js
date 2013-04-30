/*
 * client/js/views/main.js
 */

/* global define */

define([
  'jquery',
  'backbone',
  'views/home/layout',
  'views/footer',
  'views/header',
  'views/nav',
  'hbs!templates/main'
], function ($, Backbone, HomeLayout,
             FooterView, HeaderView, NavView,
             mainTpl) {
  'use strict';

  return Backbone.Marionette.Layout.extend({
    template: mainTpl,

    regions: {
      headerRegion: '#header',
      navRegion: '#nav',
      contentRegion: '#content',
      footerRegion: '#footer'
    },

    onShow: function () {
      this.headerRegion.show(new HeaderView());
      this.navRegion.show(new NavView());
      this.contentRegion.show(new HomeLayout());
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
