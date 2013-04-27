/*
 * client/js/views/_layouts/home.js
 */

/* global define */

define([
  'jquery',
  'backbone',
  'views/home/features',
  'hbs!templates/_layouts/home'
], function ($, Backbone, FeaturesView, template) {
  'use strict';

  return Backbone.Marionette.Layout.extend({
    template: template,

    regions: {
      featuresRegion: '#features'
    },

    onRender: function () {
      this.featuresRegion.show(new FeaturesView());
    }
  });

});
