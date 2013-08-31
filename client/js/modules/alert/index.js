/*
 * client/js/modules/alert/index.js
 */

/* global app */

'use strict';

var _ = require('lodash');

var ShowController = require('./show/controller');

var API = {
  showAlert: function (options) {
    if (!_.isObject(options)) { options = {}; }
    new ShowController({
      region: app.alertRegion,
      center: options.center,
      container: options.container,
      html: options.html,
      type: options.type
    });
  },

  hideAlert: function () {
    app.alertRegion.close();
  }
};

// Handle `show:alert` command.
app.commands.setHandler('show:alert', function (options) {
  API.showAlert(options);
});

// Handle `hide:alert` command.
app.commands.setHandler('hide:alert', function () {
  API.hideAlert();
});
