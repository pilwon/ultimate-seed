/*
 * client/js/routers/main.js
 */

/* global define */

define([
  'backbone.marionette'
], function (Marionette) {
  'use strict';

  return Marionette.AppRouter.extend({
    appRoutes: {
      '': 'index'
    }
  });
});
