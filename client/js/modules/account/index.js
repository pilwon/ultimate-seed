/*
 * client/js/modules/account/index.js
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
  appRoutes: {
    'account': 'view'
  },
  controller: API
});

app.on('start:router', function (optionalIds) {
  if (_.isUndefined(optionalIds) || _.contains(optionalIds, 'account')) {
    new Router();
  }
});
