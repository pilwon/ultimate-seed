/*
 * client/js/controllers/homeController.js
 */

'use strict';

var angular = require('angular');



// NOTE: Do not have [] as a second argument because it creates a new module.
// We already created the module in index.js.
var home = angular.module('ngApp.modules.home');

home.controller('HomeController', function ($scope) {
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
