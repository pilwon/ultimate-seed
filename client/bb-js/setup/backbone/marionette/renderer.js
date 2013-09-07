/*
 * client/js/setup/backbone/marionette/renderer.js
 */

'use strict';

var Marionette = require('backbone.marionette');

var _render = Marionette.Renderer.render;

Marionette.Renderer.render = function (template) {
  if (!template) { return; }
  return _render.apply(this, arguments);
};
