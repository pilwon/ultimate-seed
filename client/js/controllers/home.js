/*
 * client/js/controllers/home.js
 */

/* globals angular */
'use strict';

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
      'Mocha w/ Chai',
      'Modernizr',
      'Mongoose',
      'Redis',
      'SocketIO',
      'Uglify'
    ];
  });
