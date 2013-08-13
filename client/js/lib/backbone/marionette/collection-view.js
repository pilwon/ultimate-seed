/*
 * client/js/lib/backbone/marionette/collection-view.js
 */

'use strict';

var Marionette = require('backbone.marionette');

var CollectionView = Marionette.CollectionView.extend({
  itemViewEventPrefix: 'childview'
});

// Public API
exports = module.exports = CollectionView;
