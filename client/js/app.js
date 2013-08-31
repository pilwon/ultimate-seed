/*
 * client/js/app.js
 */

'use strict';

var path = require('path');

var _ = require('lodash'),
    $ = require('jquery'),
    Backbone = require('backbone');

var app = new Backbone.Marionette.Application();

// Attach `lib` to `app`.
app.lib = require('./lib');

// Handle `initialize:before` event.
app.on('initialize:before', function (options) {
  // Save app options to `app.config`.
  app.config = app.request('new:config:entity', options);

  // Register event handlers for `app.cofig`.
  app.config.on('change:title', function (model, value) {
    // Set title.
    global.document.title = value;
  });
  app.config.on('change:environment', function (model, value) {
    // Expose entire `app` in development mode.
    if (value === 'development') {
      global.test = require('./test');
    } else {
      delete global.test;
    }
  });

  // Trigger change event for all `app.config` attributes.
  _.keys(app.config.attributes).forEach(function (attribute) {
    app.config.trigger('change:' + attribute, app.config, app.config.get(attribute));
  });

  // Check if the current session is authenticated.
  $.get('/api/me').done(function (result) {
    app.config.set('user', result.data);
  });
});

// Add initializer.
app.addInitializer(function () {
  app.execute('show:footer');
  app.execute('show:header');
  app.execute('show:nav');
});

// Handle `initialize:after` event.
app.on('initialize:after', function () {
  // Start Backbone.history.
  if (Backbone.history) {
    Backbone.history.start({ pushState: true });
  }

  // Default route if empty.
  if (!app.getRoute()) {
    app.navigate(app.config.get('defaultRoute'), { trigger: true });
  }

  // Snatch all click events on anchor tags.
  $(document).on('click', 'a', function (e) {
    var href = $(this).attr('href'), i;
    app.globalConfig.fromServer = false;
    if (href[0] === '#' || href[0] === '?') {
      i = app.getRoute().indexOf(href[0]);
      if (i === -1) { i = app.getRoute().length; }
      href = app.getRoute().slice(0, i) + (href.length > 1 ? href : '');
    } else if (href[0] === '.') {
      href = path.join(path.dirname(app.getRoute()), href);
    }
    if (href.slice(0, 2) !== '//' && !/^[^?\/]+:/.test(href)) {
      e.preventDefault();
      app.navigate(href, { trigger: true });
    }
  });
});

// Add regions.
app.addRegions({
  alertRegion: '#alert',
  footerRegion: '#footer',
  headerRegion: '#header',
  mainRegion: '#main',
  navRegion: '#nav'
});

// Handle `set:layout` command.
app.commands.setHandler('set:layout', function (layout) {
  switch (layout) {
  case 'fullscreen':
    app.footerRegion.$el.hide();
    app.headerRegion.$el.hide();
    app.navRegion.$el.hide();
    break;
  default:
    app.footerRegion.$el.show();
    app.headerRegion.$el.show();
    app.navRegion.$el.show();
  }
});

// Handle `register:instance` command.
app.commands.setHandler('register:instance', function (instance, id) {
  if (app.config.get('environment') === 'development') {
    app.register(instance, id);
  }
});

// Handle `unregsiter:instance` command.
app.commands.setHandler('unregister:instance', function (instance, id) {
  if (app.config.get('environment') === 'development') {
    app.unregister(instance, id);
  }
});

// Handle `when:fetched` command.
app.commands.setHandler('when:fetched', function (entities, cb) {
  var xhrs = _.chain([entities]).flatten().pluck('_fetch').value();
  $.when(xhrs).done(function () {
    cb();
  });
});

// Handle `default:region` request.
app.reqres.setHandler('default:region', function () {
  return app.mainRegion;
});

// Public API
exports = module.exports = app;
