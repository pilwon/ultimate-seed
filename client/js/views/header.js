/*
 * client/js/views/header.js
 */

/* global define */

define([
  'backbone',
  'hbs!templates/_partials/header'
], function (Backbone, template) {
  'use strict';

  return Backbone.Marionette.ItemView.extend({
    template: template
  });
});
