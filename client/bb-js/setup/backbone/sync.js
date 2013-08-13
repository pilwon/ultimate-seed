/*
 * client/js/setup/backbone/sync.js
 */

'use strict';

var _ = require('lodash'),
    Backbone = require('backbone');

var _sync = Backbone.sync;

var methods = {
  beforeSend: function () {
    this.trigger('sync:start', this);
  },

  complete: function () {
    this.trigger('sync:stop', this);
  }
};

Backbone.sync = function (method, entity, options) {
  if (!_.isObject(options)) { options = {}; }

  _.defaults(options, {
    beforeSend: _.bind(methods.beforeSend, entity),
    complete: _.bind(methods.complete, entity)
  });

  if (!entity._fetch && method === 'read') {
    entity._fetch = _sync(method, entity, options);
  }
};
