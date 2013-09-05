/*
 * client/js/modules/auth/index.js
 */

/* global app */

'use strict';

var _ = require('lodash'),
    Backbone = require('backbone');

var LoginController = require('./login/controller'),
    LogoutController = require('./logout/controller'),
    RegisterController = require('./register/controller');

var API = {
  facebookCallback: function () {
    app.navigate('', { trigger: true, replace: true });
  },
  login: function () {
    new LoginController();
  },
  logout: function () {
    new LogoutController();
  },
  register: function () {
    new RegisterController();
  }
};

var Router = Backbone.Marionette.AppRouter.extend({
  controller: API,
  appRoutes: {
    'login': 'login',
    'logout': 'logout',
    'register': 'register',
    '_=_': 'facebookCallback'
  }
});

app.on('start:router', function (optionalIds) {
  if (_.isUndefined(optionalIds) || _.contains(optionalIds, 'auth')) {
    new Router();
  }
});
