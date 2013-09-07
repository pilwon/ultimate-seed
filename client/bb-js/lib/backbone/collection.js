/*
 * client/js/lib/backbone/collection.js
 */

'use strict';

var _ = require('lodash'),
    Backbone = require('backbone');

var Collection = Backbone.Collection.extend({
  parse: function (result) {
    return (_.isArray(result.data) ? result.data : result);
  }
});

// Public API
exports = module.exports = Collection;
