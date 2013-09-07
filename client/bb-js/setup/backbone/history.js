/*
 * client/js/setup/backbone/history.js
 */

'use strict';

var _ = require('lodash'),
    Backbone = require('backbone');

var _navigate = Backbone.History.prototype.navigate;

Backbone.History.prototype.navigate = function (fragment, options) {
  if (!_.isPlainObject(options)) { options = {}; }

  var prevFragment = this.fragment;

  _.defaults(options, {
    trigger: false,
    replace: false,
    scrollTop: true
  });

  if (options.scrollTop) {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

  _navigate.apply(this, arguments);

  if (options.refresh && options.trigger &&
      prevFragment === this.getFragment(fragment)) {
    this.loadUrl(fragment);
  }
};
