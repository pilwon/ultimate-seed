/*
 * client/js/collections/features.js
 */

/* global define */

define([
  'backbone',
  'models/feature'
], function (Backbone, Feature) {
  'use strict';

  var Collection = Backbone.Collection.extend({
    model: Feature
  });

  return Collection;
});
