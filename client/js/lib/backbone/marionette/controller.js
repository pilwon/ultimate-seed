/*
 * client/js/lib/backbone/marionette/controller.js
 */

/* global app */

'use strict';

var _ = require('lodash'),
    Marionette = require('backbone.marionette');

var Controller = Marionette.Controller.extend({
  constructor: function (options) {
    if (!_.isPlainObject(options)) { options = {}; }
    this.region = options.region || app.request('default:region');
    this._id = _.uniqueId('controller');
    app.execute('register:controller', this, this._id);
    Marionette.Controller.apply(this, arguments);
  },

  _manageView: function (view, options) {
    if (options.loading) {
      app.execute('show:loading', view, options);
    } else {
      options.region.show(view);
    }
  },

  _setMainView: function (view) {
    if (this._mainView) { return; }
    this._mainView = view;
    this.listenTo(view, 'close', this.close);
  },

  close: function () {
    app.execute('deregister:controller', this, this._id);
    Marionette.Controller.prototype.close.apply(this, arguments);
  },

  show: function (view, options) {
    if (!_.isPlainObject(options)) { options = {}; }

    _.defaults(options, {
      loading: false,
      region: this.region
    });

    this._setMainView(view);
    this._manageView(view, options);
  }
});

// Public API
exports = module.exports = Controller;
