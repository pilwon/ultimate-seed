/*
 * client/js/main.js
 */

/* global debug */

require.config({
  config: {
    i18n: {
      locale: 'en-us'
    }
  },
  hbs: {
    disableI18n: true,
    helperDirectory: 'templates/_helpers/',
    i18nDirectory: 'templates/_i18n/',
    templateExtension: 'html'
  },
  paths: {
    'backbone': '../components/backbone-amd/backbone',
    'backbone.babysitter': '../components/backbone.babysitter/lib/amd/backbone.babysitter',
    'backbone.eventbinder': '../components/backbone.eventbinder/lib/amd/backbone.eventbinder',
    'backbone.marionette': '../components/backbone.marionette/lib/core/amd/backbone.marionette',
    'backbone.marionette.handlebars': '../components/backbone.marionette.handlebars/backbone.marionette.handlebars',
    'backbone.queryparams': 'vendor/backbone.queryparams/backbone.queryparams',
    'backbone.routefilter': 'vendor/backbone.routefilter/backbone.routefilter',
    'backbone.wreqr': '../components/backbone.wreqr/lib/amd/backbone.wreqr',
    'bootstrap': '../components/sass-bootstrap/docs/assets/js/bootstrap',
    'handlebars': '../components/require-handlebars-plugin/Handlebars',
    'hbs': '../components/require-handlebars-plugin/hbs',
    'i18n': '../components/requirejs-i18n/i18n',
    'i18nprecompile': '../components/require-handlebars-plugin/hbs/i18nprecompile',
    'jquery': '../components/jquery/jquery',
    'jquery.cookie': '../components/jquery.cookie/jquery.cookie',
    'jquery.fitvids': 'vendor/jquery.fitvids/jquery.fitvids',
    'json2': '../components/require-handlebars-plugin/hbs/json2',
    'text': '../components/requirejs-text/text',
    'underscore': '../components/underscore-amd/underscore'
  },
  shim: {
    'app': {
      deps: [
        'backbone.marionette.handlebars',
        'backbone.queryparams',
        'backbone.routefilter',
        'bootstrap',
        'jquery.cookie',
        'jquery.fitvids',
        'vendor/debug/ba-debug',
        'vendor/google-analytics/ga',
        'vendor/kissmetrics/kissmetrics',
        'vendor/sprintf/sprintf'
      ]
    },
    'backbone': {
      deps: [
        'jquery',
        'underscore'
      ]
    },
    'backbone.babysitter': {
      deps: ['backbone']
    },
    'backbone.marionette': {
      deps: [
        'backbone',
        'backbone.wreqr',
        'backbone.babysitter'
      ]
    },
    'backbone.marionette.handlebars': {
      deps: [
        'backbone.marionette',
        'handlebars',
        'hbs',
        'i18nprecompile',
        'json2'
      ]
    },
    'backbone.queryparams': {
      deps: ['backbone'],
    },
    'backbone.routefilter': {
      deps: ['backbone'],
    },
    'backbone.wreqr': {
      deps: ['backbone']
    },
    'bootstrap': {
      deps: ['jquery']
    },
    'jquery.cookie': {
      deps: ['jquery']
    },
    'jquery.fitvids': {
      deps: ['jquery']
    },
    'socketio': {
      deps: ['app']
    }
  }
});

require([
  'jquery',
  'app',
  'socketio'
], function ($, app, socketio) {
  'use strict';

  // Set log level
  // log (1) < debug (2) < info (3) < warn (4) < error (5)
  debug.setLevel(5);  // shows N highest priority levels

  $(function () {
    app.start();
    socketio.connect();
  });
});
