/*
 * client/js/views/_partials/footer.js
 */

/* global define */

define([
  'jquery',
  'backbone',
  'hbs!templates/_partials/footer'
], function ($, Backbone, template) {
  'use strict';

  return Backbone.Marionette.Layout.extend({
    template: template
  });
});
