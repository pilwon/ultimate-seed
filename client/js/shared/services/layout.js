/*
 * client/js/shared/services/layout.js
 */

'use strict';

var _views;

function getViews() {
  return _views;
}

function setViews(views) {
  _views = views;
}

// Public API
exports = module.exports = function (ngModule) {
  ngModule.provider('layout', {
    getViews: getViews,
    setViews: setViews,

    $get: function () {
    }
  });
};
