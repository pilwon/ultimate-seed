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
  deregisterController: function (controller) {
    delete this._controllers[controller._id];
  },

  getControllers: function () {
    return _.values(this._controllers);
  },

  getParsedUrl: function () {
    return url.parse(location.href);
  },

  getRoute: function () {
    return path.join('/', Backbone.history.fragment);
  },

  navigate: function (route, options) {
    app.execute('hide:alert');
    if (!_.isPlainObject(options)) { options = {}; }
    route = route.replace(/^([^\/])(.*)([\/#?]?)$/, '/$1$2');
    Backbone.history.navigate(route, options);
  },

  registerController: function (controller) {
    if (!_.isObject(this._controllers)) {
      this._controllers = {};
    }
    this._controllers[controller._id] = controller;
  },

  resetControllers: function () {
    var oldCount = _.size(this._controllers),
        newCount;
    _.each(this._controllers, function (controller) {
      controller.region.close();
    });
    newCount = _.size(this._controllers);
    console.info(
      '%d controllers -> %d controllers',
      oldCount, newCount
    );
    if (newCount) {
      console.warn(this._controllers);
    }
  }
});
