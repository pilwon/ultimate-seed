/*
 * client/js/controllers/homeController.js
 */

/* globals app */
'use strict';


app.controller('HomeController', function ($scope, $window, $cookies) {
  $scope.items = [
    'Angular',
    'Bootstrap',
    'Bower',
    'Browserify',
    'Express',
    'Font Awesome',
    'Grunt',
    'Handlebars',
    'jQuery',
    'JSHint',
    'LESS',
    'LESS Hat',
    'Livereload',
    'Lodash (Underscore)',
    'Modernizr',
    'MongoDB w/ Mongoose',
    'Passport',
    'Passport for Facebook',
    'Passport for Google',
    'Passport for Twitter',
    'Redis w/ Hiredis',
    'SocketIO',
    'Source Maps',
    'Uglify',
    'Winston'
  ];
});
