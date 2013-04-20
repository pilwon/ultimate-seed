/*
 * client/js/views/main.js
 */

/* global define */

define([
  'jquery',
  'backbone',
  'vent',
  'views/_partials/header',
  'views/_partials/nav',
  'views/_layouts/home',
  'views/_partials/footer',
  'hbs!templates/main'
], function ($, Backbone, vent, HeaderView, NavView, HomeView,
             FooterView, template) {
  'use strict';

  return Backbone.Marionette.Layout.extend({
    template: template,

    regions: {
      headerRegion: '#header',
      navRegion: '#nav',
      contentRegion: '#content',
      footerRegion: '#footer'
    },

    onRender: function () {
      this.headerRegion.show(new HeaderView());
      this.navRegion.show(new NavView());
      this.contentRegion.show(new HomeView());
      this.footerRegion.show(new FooterView());
    }
  });

});
