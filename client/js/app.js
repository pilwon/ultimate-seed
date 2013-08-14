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

// Add regions.
app.addRegions({
  navRegion: '#nav',
  headerRegion: '#header',
  mainRegion: '#main',
  footerRegion: '#footer'
});

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
});

// Add initializer.
app.addInitializer(function () {
  app.execute('show:nav');
  app.execute('show:header');
  app.execute('show:footer');
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
    var $this = $(this),
        href = $this.attr('href');
    href = path.join(path.dirname(app.getUrl().pathname), href);
    if (href.slice(0, 2) !== '//' && !/^[^?]+:\/\//.test(href) && !$this.attr('target')) {
      // Internal link w/o target.
      e.preventDefault();
      Backbone.history.navigate(href, { trigger: true });
    }
  });
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
