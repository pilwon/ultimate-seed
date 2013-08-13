/*
 * client/js/lib/backbone/marionette/controller.js
 */

/* global app */

'use strict';

var _ = require('lodash'),
    Marionette = require('backbone.marionette');

var Controller = Marionette.Controller.extend({
  constructor: function (options) {
    this.region = (options || {}).region || app.request('default:region');
    Marionette.Controller.apply(this, arguments);
    this._instanceId = _.uniqueId('controller');
    app.execute('register:instance', this, this._instanceId);
  },

  close: function () {
    delete this.region;
    delete this.options;
    Marionette.Controller.prototype.close.apply(this, arguments);
    app.execute('unregister:instance', this, this._instanceId);
  },

  show: function (view) {
    this.listenTo(view, 'close', this.close);
    this.region.show(view);
  }
});

// Public API
exports = module.exports = Controller;
