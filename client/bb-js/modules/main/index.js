/*
 * client/js/modules/main/index.js
 */

/* global app */

'use strict';

var _ = require('lodash'),
    Backbone = require('backbone');

var HomeController = require('./home/controller');

var API = {
  home: function () {
    new HomeController();
  }
};

var Router = Backbone.Marionette.AppRouter.extend({
  controller: API,
  appRoutes: {
    '': 'home',
    'index.html': 'home'
  }
});

app.on('start:router', function (optionalIds) {
  if (_.isUndefined(optionalIds) || _.contains(optionalIds, 'main')) {
    new Router();
  }
});
