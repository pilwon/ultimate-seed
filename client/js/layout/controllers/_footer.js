/*
 * client/js/layout/controllers/_footer.js
 */

'use strict';

var util = require('util');

var $ = require('jquery');

exports = module.exports = function (ngModule) {
  ngModule.controller('_FooterCtrl', function ($scope, $cookies) {
    if ($cookies.livereload) {
      $.getScript(util.format('http://localhost:%s/livereload.js?snipver=1', $cookies.livereload));
    }
  });
};
