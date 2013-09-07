/*
 * client/js/modules/footer/index.js
 */

/* global app */

'use strict';

var ShowController = require('./show/controller');

var API = {
  showFooter: function () {
    new ShowController({
      region: app.footerRegion
    });
  }
};

// Handle `show:footer` command.
app.commands.setHandler('show:footer', function () {
  API.showFooter();
});
