/*
 * client/js/modules/main/home/controller.js
 */

/* global app */

'use strict';

var views = require('./views');

var Controller = app.lib.Backbone.Marionette.Controller.extend({
  initialize: function () {
    var layout = this._layout = new views.Layout();

    this.listenTo(layout, 'show', function () {
      this.showFeaturesRegion();
    });

    this.show(layout);
  },

  showFeaturesRegion: function () {
    var layout = this._layout,
        features = app.request('feature:entities');

    features.comparator = function (feature) {
      return feature.get('text');
    };

    var featuresView = new views.FeaturesView({
      collection: features
    });

    layout.featuresRegion.show(featuresView);
  }
});

// Public API
exports = module.exports = Controller;
