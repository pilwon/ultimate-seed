/*
 * client/js/setup/backbone/marionette/region.js
 */

'use strict';

var Backbone = require('backbone');

var _open = Backbone.Marionette.Region.prototype.open;

Backbone.Marionette.Region.prototype.open = function (view) {
  this.$el.hide();
  _open.call(this, view);
  this.$el.fadeIn();
};
