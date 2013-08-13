/*
 * client/js/setup/backbone/marionette/view.js
 */

'use strict';

var _ = require('lodash'),
    $ = require('jquery'),
    Backbone = require('backbone');

var _remove = Backbone.Marionette.View.prototype.remove;

_.extend(Backbone.Marionette.View.prototype, {
  addOpacityWrapper: function (init) {
    if (!_.isBoolean(init)) { init = true; }
    this.$el.toggleWrapper({
      className: 'opacity'
    }, init);
  },

  setInstancePropertiesFor: function (params) {
    _.each(_.pick(this.options, params), function (val, key) {
      this[key] = val;
    });
  },

  remove: function (params) {
    var self = this,
        wrapper;

    // console.log('removing', this);

    if (_.isObject(this.model) && _.isFunction(this.model.isDestroyed) && this.model.isDestroyed()) {
      wrapper = this.$el.toggleWrapper({
        className: 'opacity',
        backgroundColor: 'red'
      });
      wrapper.fadeOut(400, function () {
        return $(this).remove();
      });
      this.$el.fadeOut(400, function () {
        return _remove.apply(self, params);
      });
    } else {
      _remove.apply(this, params);
    }
  },

  templateHelpers: {
    linkTo: function (name, url, options) {
      if (!_.isObject(options)) { options = {}; }

      _.defaults(options, {
        external: false
      });

      if (!options.external) {
        url = '#' + url;
      }

      return '<a href="' + url + '">#{@escape(name)}</a>';
    }
  }
});
