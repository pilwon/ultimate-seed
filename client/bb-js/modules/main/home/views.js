/*
 * client/js/modules/main/home/views.js
 */

/* global app */

'use strict';

var emptyTpl = require('./templates/empty.hbs'),
    featureTpl = require('./templates/feature.hbs'),
    featuresTpl = require('./templates/features.hbs'),
    layoutTpl = require('./templates/layout.hbs');

var _EmptyView = app.lib.Backbone.Marionette.ItemView.extend({
  template: emptyTpl
});

var Layout = app.lib.Backbone.Marionette.Layout.extend({
  template: layoutTpl,
  regions: {
    featuresRegion: '.features'
  }
});

var FeatureView = app.lib.Backbone.Marionette.ItemView.extend({
  template: featureTpl,
  tagName: 'li',
  itemViewContainer: 'ul'
});

var FeaturesView = app.lib.Backbone.Marionette.CompositeView.extend({
  template: featuresTpl,
  emptyView: _EmptyView,
  itemView: FeatureView,
  itemViewContainer: '.features'
});

// Public API
exports.Layout = Layout;
exports.FeatureView = FeatureView;
exports.FeaturesView = FeaturesView;
