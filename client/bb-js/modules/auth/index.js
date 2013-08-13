/*
 * client/js/modules/auth/index.js
 */

/* global app */

'use strict';

var _ = require('lodash'),
    Backbone = require('backbone');

var API = {
  // register: function () {

  // },
  // login: function () {

  // },
  // logout: function () {

  // },
  facebookCallback: function () {
    app.navigate('/', { trigger: true, replace: true });
  }
};

var Router = Backbone.Marionette.AppRouter.extend({
  appRoutes: {
    // 'register': 'register',
    // 'login': 'login',
    // 'logout': 'logout'

    '_=_': 'facebookCallback'
  },
  controller: API
});

app.on('start:router', function (optionalIds) {
  if (_.isUndefined(optionalIds) || _.contains(optionalIds, 'auth')) {
    new Router();
  }
});
