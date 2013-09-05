/*
 * client/js/modules/main/home/controller.js
 */

/* global app */

'use strict';

var views = require('./views');

var Controller = app.lib.Backbone.Marionette.Controller.extend({
  initialize: function () {
    this.layout = new views.Layout();

    this.listenTo(this.layout, 'show', function () {
      this.showFeaturesView();
    });

    this.show(this.layout);
  },

  showFeaturesView: function () {
    var features = app.request('feature:entities');

    app.execute('when:fetched', features, function () {
      features.reset(features.sortBy('url'));
    });

    var featuresView = new views.FeaturesView({
      collection: features
    });

    this.show(featuresView, {
      loading: true,
      region: this.layout.featuresRegion
    });
  }
});

// Public API
exports = module.exports = Controller;
