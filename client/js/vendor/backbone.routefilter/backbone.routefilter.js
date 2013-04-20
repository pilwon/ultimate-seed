/*
 * client/js/vendor/backbone.routefilter/backbone.routefilter.js
 */

/* global define */

require([
  'underscore',
  'backbone'
], function (_, Backbone) {
  'use strict';

  _.extend(Backbone.Router.prototype, {

    /**
     * Override default route fn to call before/after filters
     *
     * @param {String} route
     * @param {String} name
     * @param {Function} [callback]
     * @return {*}
     */
    route: function(route, name, callback) {
      if (!_.isRegExp(route)) route = this._routeToRegExp(route);
      if (!callback) callback = this[name];
      Backbone.history.route(route, _.bind(function(fragment) {
        var args = this._extractParameters(route, fragment);
        if (this._runFilters(this.before, fragment, args, true)) {
          if(callback) callback.apply(this, args);
          this.trigger.apply(this, ['route:' + name].concat(args));
          this.trigger('route', name, args);
          Backbone.history.trigger('route', this, name, args);
          this._runFilters(this.after, fragment, args, false);
        }
      }, this));

      return this;
    },

    /**
     * Run set of filters and stops if any of them failing (returns false)
     * @param filters
     * @param fragment
     * @param args
     * @param {boolean} stopOnError - will stop iterating over filters if any returns false
     * @return {boolean}
     * @private
     */
    _runFilters: function(filters, fragment, args, stopOnError) {
      return _[stopOnError ? 'every' : 'each'](filters, function(fn, filter) {
        filter = _.isRegExp(filter) ? filter : this._routeToRegExp(filter);

        if (filter.test(fragment)) {
          fn = _.isFunction(fn) ? fn : this[fn];
          return fn.apply(this, [fragment, args]) !== false;
        }

        return true;
      }, this);
    }
  });

});
