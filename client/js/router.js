/*
 * client/js/router.js
 */

/* global define */

define([
  'backbone',
  'controllers/account',
  'controllers/auth',
  'controllers/home'
], function (Backbone, account, auth, home) {
  'use strict';

  return Backbone.Marionette.AppRouter.extend({
    routes: {
      '': home.index,

      'account': account.index,

      'login': auth.login,
      'register': auth.register,
      'lost-password': auth.lostPassword,

      '*any': function () {
        Backbone.history.navigate('');
        window.location.href = '/404.html';
      }
    }
  });

});
