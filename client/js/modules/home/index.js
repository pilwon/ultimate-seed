/*
 * client/js/modules/home/index.js
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
    '': 'view',
    'index.html': 'view'
  },
  controller: API
});

app.on('start:router', function (optionalIds) {
  if (_.isUndefined(optionalIds) || _.contains(optionalIds, 'home')) {
    new Router();
  }
});
