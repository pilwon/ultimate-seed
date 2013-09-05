/*
 * client/js/components/loading/index.js
 */

/* global app */

'use strict';

var ShowController = require('./show/controller');

var API = {
  show: function (view, options) {
    new ShowController({
      view: view,
      region: options.region,
      config: options.loading
    });
  }
};

// Handle `show:loading` command.
app.commands.setHandler('show:loading', function (view, options) {
  API.show(view, options);
});
