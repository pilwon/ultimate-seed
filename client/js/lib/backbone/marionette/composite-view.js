/*
 * client/js/lib/backbone/marionette/composite-view.js
 */

'use strict';

var Marionette = require('backbone.marionette');

var CompositeView = Marionette.CompositeView.extend({
  itemViewEventPrefix: 'childview'
});

// Public API
exports = module.exports = CompositeView;
