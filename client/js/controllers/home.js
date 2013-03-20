/*
 * client/js/controllers/home.js
 */

'use strict';

/* globals angular */
angular.module('mainApp')
  .controller('HomeCtrl', function ($scope) {
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
      'Mocha',
      'Modernizr',
      'Mongoose',
      'Redis',
      'SocketIO',
      'Uglify'
    ];
  });
