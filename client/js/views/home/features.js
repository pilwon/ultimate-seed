/*
 * client/js/views/home/features.js
 */

/* global define */

define([
  'jquery',
  'backbone',
  'lib/util',
  'collections/features',
  'hbs!templates/home/features'
], function ($, Backbone, util, Features, template) {
  'use strict';

  var features = new Features();

  return Backbone.Marionette.ItemView.extend({
    template: template,
    collection: features,

    initialize: function() {
      this.listenTo(this.collection, 'all', this.render, this);

      $.getJSON('/json/features.json', function (data) {
        features.add(data);
      });
    }
  });

});
