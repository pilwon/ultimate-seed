/*
 * client/js/modules/auth/index.js
 */

/* global app */

'use strict';

var _ = require('lodash'),
    Backbone = require('backbone');

var LoginController = require('./login/controller'),
    RegisterController = require('./register/controller');

var API = {
  register: function () {
    new RegisterController();
  },
  login: function () {
    new LoginController();
  },
  logout: function () {
    location.href = '/logout?_method=post';
  },
  facebookCallback: function () {
    app.navigate('', { trigger: true, replace: true });
  }
};

var Router = Backbone.Marionette.AppRouter.extend({
  appRoutes: {
    // 'register': 'register',
    // 'login': 'login',
    // 'logout': 'logout',
    '_=_': 'facebookCallback'
  },
  controller: API
});

app.on('start:router', function (optionalIds) {
  if (_.isUndefined(optionalIds) || _.contains(optionalIds, 'auth')) {
    new Router();
  }
});
