/*
 * client/js/views/footer.js
 */

/* global define */

define([
  'backbone',
  'hbs!templates/footer'
], function (Backbone, template) {
  'use strict';

  return Backbone.Marionette.Layout.extend({
    template: template
  });
});
