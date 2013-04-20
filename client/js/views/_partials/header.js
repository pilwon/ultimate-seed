/*
 * client/js/views/_partials/header.js
 */

/* global define */

define([
  'backbone',
  'hbs!templates/_partials/header'
], function (Backbone, template) {
  'use strict';

  return Backbone.Marionette.Layout.extend({
    template: template
  });
});
