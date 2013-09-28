/*
 * client/js/shared/services/layout.js
 */

'use strict';

var _spinnerStarted = false,
    _views;

function getViews() {
  return _views;
}

function setViews(views) {
  _views = views;
}

function startSpinner() {
  if (_spinnerStarted) { return; }
  // TODO: Start spinner.
  _spinnerStarted = true;
}

function stopSpinner() {
  if (!_spinnerStarted) { return; }
  // TODO: Stop spinner.
  _spinnerStarted = false;
}

// Public API
exports = module.exports = function (ngModule) {
  ngModule.provider('layout', {
    getViews: getViews,
    setViews: setViews,

    $get: function () {
      return {
        startSpinner: startSpinner,
        stopSpinner: stopSpinner
      };
    }
  });
};
