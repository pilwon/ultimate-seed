/*
 * client/js/controllers/home.js
 */

/* globals app */
'use strict';


app.controller('HomeController', function ($scope, $window, $cookies) {
  $scope.user = {
    name: {
      full: $cookies['user.name.full']
    }
  };

  $scope.items = [
    'Angular',
    'Express',
    'Grunt',
    'Handlebars',
    'jQuery',
    'JSHint',
    'Karma',
    'Less',
    'Lodash (Underscore)',
    'Mocha w/ Chai',
    'Modernizr',
    'MongoDB w/ Mongoose',
    'Passport',
    'Passport for Facebook',
    'Passport for Google',
    'Passport for Twitter',
    'Redis w/ Hiredis',
    'SocketIO',
    'Uglify'
  ];
});
