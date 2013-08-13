/*
 * client/js/modules/home/view/views.js
 */

/* global app */

'use strict';

var emptyTpl = require('./templates/empty.hbs'),
    featureTpl = require('./templates/feature.hbs'),
    featuresTpl = require('./templates/features.hbs'),
    layoutTpl = require('./templates/layout.hbs'),
    loadingTpl = require('./templates/loading.hbs');

var _EmptyView = app.lib.Backbone.Marionette.ItemView.extend({
  template: emptyTpl
});

var _LoadingView = app.lib.Backbone.Marionette.ItemView.extend({
  template: loadingTpl
});

var FeatureView = app.lib.Backbone.Marionette.ItemView.extend({
  template: featureTpl,
  itemViewContainer: 'ul',
  tagName: 'li'
});

var FeaturesView = app.lib.Backbone.Marionette.CompositeView.extend({
  template: featuresTpl,
  itemViewContainer: 'div.features',
  itemView: FeatureView,
  emptyView: _EmptyView,

  initialize: function() {
    this.listenTo(this.collection, 'request', this.onRequest);
    this.listenTo(this.collection, 'sync', this.onSync);

    this.collection.fetch();
  },

  onRequest: function () {
    this.emptyView = _LoadingView;
    this.render();
  },

  onSync: function () {
    this.emptyView = _EmptyView;
    this.render();
  }
});

var Layout = app.lib.Backbone.Marionette.Layout.extend({
  template: layoutTpl,

  regions: {
    featuresRegion: 'div.features'
  },

  onShow: function () {
    var features = app.request('feature:entities');
    this.featuresRegion.show(new FeaturesView({
      collection: features
    }));
  }
});

// Public API
exports.FeatureView = FeatureView;
exports.FeaturesView = FeaturesView;
exports.Layout = Layout;
