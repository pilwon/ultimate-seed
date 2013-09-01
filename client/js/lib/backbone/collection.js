/*
 * client/js/lib/backbone/collection.js
 */

'use strict';

var Backbone = require('backbone');

var Collection = Backbone.Collection.extend({
  parse: function (result) {
    return result.data;
  }
});

// Public API
exports = module.exports = Collection;
