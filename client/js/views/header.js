/*
 * client/js/views/header.js
 */

/* global define */

define([
  'backbone',
  'hbs!templates/header'
], function (Backbone, headerTpl) {
  'use strict';

  return Backbone.Marionette.Layout.extend({
    template: headerTpl
  });
});
