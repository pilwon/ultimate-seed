/*
 * client/js/modules/auth/index.js
 */

/* global app */

'use strict';

var _ = require('lodash'),
    Backbone = require('backbone');

var API = {
  register: function () {

  },
  login: function () {

  },
  logout: function () {

  },
  facebook: function () {

  },
  google: function () {

  },
  twitter: function () {

  }
};

var Router = Backbone.Marionette.AppRouter.extend({
  appRoutes: {
    'register': 'register',
    'login': 'login',
    'logout': 'logout',
    'auth/facebook': 'facebook',
    'auth/google': 'google',
    'auth/twitter': 'twitter'
  },
  controller: API
});

app.on('start:router', function (optionalIds) {
  if (_.isUndefined(optionalIds) || _.contains(optionalIds, 'auth')) {
    new Router();
  }
});
