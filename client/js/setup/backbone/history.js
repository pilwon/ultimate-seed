/*
 * client/js/setup/backbone/history.js
 */

'use strict';

var Backbone = require('backbone');

var _navigate = Backbone.History.prototype.navigate;

Backbone.History.prototype.navigate = function (fragment, options) {
  var prevFragment = this.fragment;

  _navigate.call(this, fragment, options);

  if (options.refresh && options.trigger &&
      prevFragment === this.getFragment(fragment)) {
    this.loadUrl(fragment);
  }
};
