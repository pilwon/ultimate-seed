/*
 * client/js/entities/feature.js
 */

/* global app */

'use strict';

var Feature = app.lib.Backbone.Model.extend({
  urlRoot: '/api/features',
  defaults: {
    text: null,
    url: null,
    createdAt: null,
    updatedAt: null
  }
});

var FeatureCollection = app.lib.Backbone.Collection.extend({
  url: '/api/features',
  model: Feature
});

app.reqres.setHandler('feature:entities', function () {
  var collection = new FeatureCollection();
  collection.fetch({
    reset: true
  });
  return collection;
});

app.reqres.setHandler('feature:entity', function (id) {
  var model = new Feature({
    id: id
  });
  model.fetch();
  return model;
});

app.reqres.setHandler('new:feature:entity', function (attributes) {
  return new Feature(attributes);
});
