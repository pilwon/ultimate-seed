/*
 * client/js/lib/backbone/model.js
 */

'use strict';

var _ = require('lodash'),
    $ = require('jquery'),
    Backbone = require('backbone');

var Model = Backbone.Model.extend({
  destroy: function (options) {
    if (!_.isObject(options)) { options = {}; }

    _.defaults(options, {
      wait: true
    });

    this.set({
      _destroy: true
    });

    Backbone.Model.prototype.destroy.apply(this, arguments);
  },

  isDestroyed: function () {
    this.get('_destroy');
  },

  parse: function (result) {
    return (_.isPlainObject(result.data) ? result.data : result);
  },

  save: function (data, options) {
    var isNew = this.isNew();

    if (!_.isObject(options)) { options = {}; }

    _.defaults(options, {
      wait: true,
      success: _.bind(this.saveSuccess, this, isNew, options.collection),
      error: _.bind(this.saveError, this)
    });

    this.unset('_errors');

    Backbone.Model.prototype.save.apply(this, arguments);
  },

  saveSuccess: function (isNew, collection) {
    if (isNew) {
      // Model is being created
      if (collection) {
        collection.add(this);
        collection.trigger('model:created', this);
      }
      this.trigger('created', this);
    } else {
      // Model is being updated
      if (!collection) {
        // If model has collection property defined, use that if no collection option exists.
        collection = this.collection;
      }
      if (collection) {
        collection.trigger('model:updated', this);
      }
      this.trigger('updated', this);
    }
  },

  saveError: function (model, xhr/*, options*/) {
    var parsed;

    // Set errors directly on the model unless status returned was 500 or 404
    if (xhr.status !== 404 && xhr.status !== 500) {
      parsed = $.parseJSON(xhr.responseText);
      this.set({
        _errors: (parsed ? parsed.errors : void 0)
      });
    }
  }
});

// Public API
exports = module.exports = Model;
