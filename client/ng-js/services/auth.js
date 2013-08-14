/*
 * client/js/services/auth.js
 */

/* globals app */
'use strict';


app.service('Auth', function() {
  var loggedIn = false;

  return {
    login: function() {
      loggedIn = true;
    },

    logout: function() {
      loggedIn = false;
    },

    isLoggedIn: function() {
      return loggedIn;
    }
  };
});
