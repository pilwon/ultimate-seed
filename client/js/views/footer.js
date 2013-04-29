/*
 * client/js/views/footer.js
 */

/* global define */

define([
  'backbone',
  'hbs!templates/footer'
], function (Backbone, footerTpl) {
  'use strict';

  return Backbone.Marionette.Layout.extend({
    template: footerTpl
  });
});
