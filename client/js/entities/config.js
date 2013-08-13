/*
 * client/js/entities/config.js
 */

/* global app */

'use strict';

var Config = app.lib.Backbone.Model.extend({
  defaults: {
    environment: 'development',
    title: 'ultimate-seed',
    orignalUrl: '',
    defaultRoute: ''
  }
});

app.reqres.setHandler('new:config:entity', function (attributes) {
  var config = new Config(attributes);

  config.set('originalUrl', app.getUrl().pathname);

  return config;
});
