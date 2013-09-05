/*
 * client/js/components/loading/show/controller.js
 */

/* global app */

'use strict';

var _ = require('lodash');

var views = require('./views');

var Controller = app.lib.Backbone.Marionette.Controller.extend({
  initialize: function (options) {
    var view = options.view,
        config = options.config,
        loadingView;

    if (_.isBoolean(config)) {
      config = {};
    }

    _.defaults(config, {
      type: 'spinner',
      entities: this._getEntities(view),
      debug: false
    });

    switch (config.type) {
      case 'opacity':
        if (this.region.currentView) {
          this.region.currentView.$el.css('opacity', 0.5);
        }
        break;
      case 'spinner':
        loadingView = new views.LoadingView();
        this.show(loadingView);
        break;
      default:
        throw new Error('Invalid loading type: ' + config.type);
    }

    this._showRealView(view, loadingView, config);
  },

  _getEntities: function (view) {
    return _.chain(view).pick('model', 'collection').toArray().compact().value();
  },

  _showRealView: function (realView, loadingView, config) {
    var self = this;
    app.execute('when:fetched', config.entities, function () {
      switch (config.type) {
        case 'opacity':
          if (self.region.currentView) {
            self.region.currentView.$el.removeAttr('style');
          }
          break;
        case 'spinner':
          if (self.region.currentView !== loadingView) {
            return realView.close();
          }
          break;
      }
      if (!config.debug) {
        self.show(realView);
      }
    });
  }
});

// Public API
exports = module.exports = Controller;
