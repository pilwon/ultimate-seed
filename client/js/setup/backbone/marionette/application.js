/*
 * client/js/setup/backbone/marionette/application.js
 */

/* global app */

'use strict';

var path = require('path'),
    url = require('url');

var _ = require('lodash'),
    Backbone = require('backbone');

_.extend(Backbone.Marionette.Application.prototype, {
  navigate: function (route, options) {
    app.execute('hide:alert');
    if (!_.isObject(options)) { options = {}; }
    route = route.replace(/^([^\/])(.*)([\/#?]?)$/, '/$1$2');
    Backbone.history.navigate(route, options);
  },

  getRoute: function () {
    return path.join('/', Backbone.history.fragment);
  },

  getParsedUrl: function () {
    return url.parse(location.href);
  },

  register: function (instance, id) {
    this._registry = this._registry || {};
    this._registry[id] = instance;
  },

  unregister: function (instance, id) {
    delete this._registry[id];
  },

  resetRegistry: function () {
    var oldCount = this.getRegistrySize();
    _.each(this._registry, function (controller/*, key*/) {
      controller.region.close();
    });
    var msg = 'There were ' + oldCount + ' controllers in the registry, there are now #{@getRegistrySize()}';
    if (this.getRegistrySize() > 0) {
      console.warn(msg, this._registry);
    } else {
      console.log(msg);
    }
  },

  getRegistrySize: function () {
    return _.size(this._registry);
  }
});
