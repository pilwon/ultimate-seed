/*
 * client/js/views/home/features.js
 */

/* global define */

define([
  'backbone',
  'handlebars',
  'hbs!templates/home/feature',
  'hbs!templates/home/features'
], function (Backbone, Handlebars, featureTpl, featuresTpl) {
  'use strict';

  var LoadingView = Backbone.Marionette.ItemView.extend({
    template: Handlebars.compile(
      '<div style="height: 50px;">' +
      '<i class="icon-spinner icon-spin icon-3x pull-left"></i>' +
      '</div>'
    )
  });

  var EmptyView = Backbone.Marionette.ItemView.extend({
    template: Handlebars.compile('<em>N/A</em>')
  });

  var FeatureView = Backbone.Marionette.ItemView.extend({
    template: featureTpl,
    itemViewContainer: 'ul',
    tagName: 'li'
  });

  return Backbone.Marionette.CompositeView.extend({
    template: featuresTpl,
    itemViewContainer: 'div.features',
    itemView: FeatureView,
    emptyView: EmptyView,

    initialize: function() {
      this.listenTo(this.collection, 'request', this.onRequest);
      this.listenTo(this.collection, 'sync', this.onSync);

      this.collection.fetch();
    },

    onRequest: function () {
      this.emptyView = LoadingView;
      this.render();
    },

    onSync: function () {
      this.emptyView = EmptyView;
      this.render();
    }
  });

});
