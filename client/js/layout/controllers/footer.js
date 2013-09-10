/*
 * client/js/layout/controllers/footer.js
 */

'use strict';

var util = require('util');

var $ = require('jquery');

exports = module.exports = function (ngModule) {
  ngModule.controller('FooterCtrl', function ($scope, $cookies) {
    if ($cookies.livereload) {
      $.getScript(util.format('http://localhost:%s/livereload.js?snipver=1', $cookies.livereload));
    }
  });
};
