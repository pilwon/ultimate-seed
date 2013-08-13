/*
 * client/js/modules/nav/index.js
 */

/* global app */

'use strict';

var ShowController = require('./show/controller');

var API = {
  showHeader: function () {
    new ShowController({
      region: app.navRegion
    });
  }
};

app.commands.setHandler('show:nav', function () {
  API.showHeader();
});
