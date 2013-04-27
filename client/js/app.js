/*
 * client/js/app.js
 */

/* global define */

define([
  'jquery',
  'backbone',
  'backbone.marionette',
  'router',
  'wreqr',
  'views/main'
], function ($, Backbone, Marionette, Router, wreqr, MainView) {
  'use strict';

  var app = new Marionette.Application();

  app.addRegions({
    mainRegion: '#main'
  });

  app.addInitializer(function () {
    app.mainRegion.show(new MainView());
  });

  app.on('initialize:after', function () {
    // Initialize router
    new Router();

    // Begin monitoring hash changes.
    Backbone.history.start({ pushState: true });

    // Snatch all click events on anchor tags.
    $(document).on('click', 'a:not([target])', function (event) {
      var href = $(this).attr('href');
      var protocol = this.protocol + '//';

      if (href.slice(protocol.length) !== protocol) {
        event.preventDefault();
        Backbone.history.navigate(href, { trigger: true });
      }
    });
  });

  wreqr.vent.on('vent:test', function () {
    console.log('test:vent event received.');
  });

  wreqr.vent.on('socketio:received', function (data) {
    console.log('socketio:received - ' + JSON.stringify(data));
  });

  wreqr.vent.trigger('vent:test');

  return app;
});
