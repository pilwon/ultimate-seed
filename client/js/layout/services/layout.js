/*
 * client/js/layout/services/layout.js
 */

'use strict';

var $ = require('jquery');

var _spinnerStarted = false,
    _views;

function getViews() {
  return _views;
}

function setViews(views) {
  _views = views;
}

function startSpinner() {
  if (!_spinnerStarted) {
    var $spinner = $('<div/>').spin({
      lines: 13,            // The number of lines to draw
      length: 20,           // The length of each line
      width: 10,            // The line thickness
      radius: 30,           // The radius of the inner circle
      corners: 1,           // Corner roundness (0..1)
      rotate: 0,            // The rotation offset
      direction: 1,         // 1: clockwise, -1: counterclockwise
      color: '#888',        // #rgb or #rrggbb
      speed: 1,             // Rounds per second
      trail: 60,            // Afterglow percentage
      shadow: false,        // Whether to render a shadow
      hwaccel: true,        // Whether to use hardware acceleration
      className: 'spinner', // The CSS class to assign to the spinner
      top: 'auto',          // Top position relative to parent in px
      left: 'auto',         // Left position relative to parent in px
      zIndex: 2e9 + 1       // The z-index (defaults to 2000000000)
    }).center();
    $('#spinner').html($spinner).fadeIn('fast');
  }
  _spinnerStarted = true;
}

function stopSpinner() {
  if (_spinnerStarted) {
    $('#spinner').fadeOut('fast');
  }
  _spinnerStarted = false;
}

// Public API
exports = module.exports = function (ngModule) {
  ngModule.provider('layout', {
    getViews: getViews,
    setViews: setViews,

    $get: [function () {
      return {
        startSpinner: startSpinner,
        stopSpinner: stopSpinner
      };
    }]
  });
};
