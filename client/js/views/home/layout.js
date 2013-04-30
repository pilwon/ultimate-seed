/*
 * client/js/views/home/layout.js
 */

/* global define */

define([
  'backbone',
  'collections/features',
  'views/home/features',
  'hbs!templates/home/layout'
], function (Backbone, Features, FeaturesView, homeLayoutTpl) {
  'use strict';

  return Backbone.Marionette.Layout.extend({
    template: homeLayoutTpl,

    regions: {
      featuresRegion: '#features'
    },

    onShow: function () {
      var features = new Features();
      this.featuresRegion.show(new FeaturesView({
        collection: features
      }));
    }
  });

});
