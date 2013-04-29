/*
 * client/js/collections/features.js
 */

/* global define */

define([
  'backbone',
  'models/feature'
], function (Backbone, Feature) {
  'use strict';

  return Backbone.Collection.extend({
    model: Feature,
    url: '/api/features'
  });

});
