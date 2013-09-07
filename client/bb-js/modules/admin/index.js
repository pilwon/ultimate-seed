/*
 * client/js/modules/admin/index.js
 */

/* global app */

'use strict';

var _ = require('lodash'),
    Backbone = require('backbone');

var ViewController = require('./view/controller');

var API = {
  view: function () {
    new ViewController();
  }
};

var Router = Backbone.Marionette.AppRouter.extend({
  controller: API,
  appRoutes: {
    // 'admin': 'view'
  }
});

app.on('start:router', function (optionalIds) {
  if (_.isUndefined(optionalIds) || _.contains(optionalIds, 'admin')) {
    new Router();
  }
});
