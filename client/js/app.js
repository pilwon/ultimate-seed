/*
 * client/js/app.js
 */

/* global define */

define([
  'backbone',
  'backbone.marionette',
  'routers/main',
  'controllers/main',
  'vent',
  'views/header',
  'views/nav',
  'views/main',
  'views/footer'
], function (Backbone, Marionette, MainRouter, mainController, vent,
             HeaderView, NavView, MainView, FooterView) {
  'use strict';

  var app = new Marionette.Application();

  app.addRegions({
    headerRegion: '#header',
    navRegion: '#nav',
    mainRegion: '#main',
    footerRegion: '#footer'
  });

  app.addInitializer(function () {
    app.headerRegion.show(new HeaderView());
    app.navRegion.show(new NavView());
    app.mainRegion.show(new MainView());
    app.footerRegion.show(new FooterView());
  });

  app.on('initialize:after', function () {
    new MainRouter({
      controller: mainController
    });

    if (Backbone.history){
      Backbone.history.start();
    }
  });

  vent.on('vent:test', function () {
    console.log('test:vent event received.');
  });

  vent.on('socketio:received', function (data) {
    console.log('socketio:received - ' + JSON.stringify(data));
  });

  vent.trigger('vent:test');

  return app;
});
