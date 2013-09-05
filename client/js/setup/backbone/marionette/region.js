/*
 * client/js/setup/backbone/marionette/region.js
 */

'use strict';

var Marionette = require('backbone.marionette');

var _open = Marionette.Region.prototype.open;

Marionette.Region.prototype.open = function (view) {
  if (view.animate) {
    this.$el.hide();
  }
  _open.apply(this, arguments);
  if (view.animate) {
    this.$el.fadeIn();
  }
};
