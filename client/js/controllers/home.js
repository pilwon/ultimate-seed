/*
 * client/js/controllers/home.js
 */

/* globals ngApp */
'use strict';

ngApp.controller('HomeController', function ($scope, $cookies) {
  $scope.livereload = $cookies.livereload;

  $scope.user = {
    name: {
      full: $cookies['user.name.full']
    }
  };

  $scope.items = [
    'Angular',
    'Bower',
    'Bootstrap',
    'Compass (SCSS)',
    'Express',
    'Grunt',
    'Handlebars',
    'jQuery',
    'JSHint',
    'Karma',
    'Livereload',
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
    'Uglify',
  ];
});
