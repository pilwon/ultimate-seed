/*
 * client/js/entities/config.js
 */

/* global app */

'use strict';

var Config = app.lib.Backbone.Model.extend({
  defaults: {
    environment: 'development',
    title: 'ultimate-seed',
    defaultRoute: '',
    user: null
  }
});

app.reqres.setHandler('new:config:entity', function (attributes) {
  return new Config(attributes);
});
