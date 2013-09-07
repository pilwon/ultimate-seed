/*
 * client/js/entities/feature.js
 */

/* global app */

'use strict';

var _ = require('lodash');

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

var API = {
  createModel: function (attributes) {
    return new Feature(attributes);
  },
  getModel: function (id, params) {
    _.defaults(params, {

    });
    var model = new Feature({
      id: id
    });
    model.fetch({
      data: params
    });
    return model;
  },
  getCollection: function (params) {
    _.defaults(params, {

    });
    var collection = new FeatureCollection();
    collection.fetch({
      reset: true,
      data: params
    });
    return collection;
  }
};

app.reqres.setHandler('feature:entities', function () {
  return API.getCollection();
});

app.reqres.setHandler('feature:entity', function (id) {
  return API.getModel(id);
});

app.reqres.setHandler('new:feature:entity', function (attributes) {
  return API.createModel(attributes);
});
