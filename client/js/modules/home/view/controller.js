/*
 * client/js/modules/home/view/controller.js
 */

/* global app */

'use strict';

var views = require('./views');

var Controller = app.lib.Backbone.Marionette.Controller.extend({
  initialize: function () {
    this.layout = new views.Layout();

    this.listenTo(this.layout, 'show', function () {
      this.showFeaturesRegion();
    });

    this.show(this.layout);
  },

  showFeaturesRegion: function () {
    var features = app.request('feature:entities');

    var featuresView = new views.FeaturesView({
      collection: features
    });

    this.layout.featuresRegion.show(featuresView);
  }
});

// Public API
exports = module.exports = Controller;
