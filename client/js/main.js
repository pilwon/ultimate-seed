/*
 * client/js/main.js
 */

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
    'backbone.wreqr': '../components/backbone.wreqr/lib/amd/backbone.wreqr',
    'bootstrap': '../components/sass-bootstrap/docs/assets/js/bootstrap',
    'handlebars': '../components/require-handlebars-plugin/Handlebars',
    'hbs': '../components/require-handlebars-plugin/hbs',
    'i18n': '../components/requirejs-i18n/i18n',
    'i18nprecompile': '../components/require-handlebars-plugin/hbs/i18nprecompile',
    'jquery': '../components/jquery/jquery',
    'jquery.cookie': '../components/jquery.cookie/jquery.cookie',
    'json2': '../components/require-handlebars-plugin/hbs/json2',
    'text': '../components/requirejs-text/text',
    'underscore': '../components/underscore-amd/underscore'
  },
  shim: {
    'app': {
      deps: [
        'backbone.marionette.handlebars',
        'bootstrap',
        'jquery.cookie',
        'vendor/google-analytics/ga'
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
        'underscore',
        'backbone',
        'backbone.wreqr',
        'backbone.babysitter'
      ]
    },
    'backbone.marionette.handlebars': {
      deps: [
        'underscore',
        'backbone',
        'backbone.marionette',
        'handlebars',
        'hbs',
        'i18nprecompile',
        'json2'
      ]
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

  $(function () {
    app.start();
    socketio.connect();
  });
});
