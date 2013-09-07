/*
 * client/js/modules/header/index.js
 */

/* global app */

'use strict';

var ShowController = require('./show/controller');

var API = {
  showHeader: function () {
    new ShowController({
      region: app.headerRegion
    });
  }
};

// Handle `show:header` command.
app.commands.setHandler('show:header', function () {
  API.showHeader();
});
