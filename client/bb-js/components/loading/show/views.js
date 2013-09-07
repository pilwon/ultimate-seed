/*
 * client/js/components/loading/show/views.js
 */

/* global app */

'use strict';

var LoadingView = app.lib.Backbone.Marionette.ItemView.extend({
  template: false,
  className: 'loading',

  onShow: function () {
    this.$el.spin({
      lines: 10,            // The number of lines to draw
      length: 6,            // The length of each line
      width: 2.5,           // The line thickness
      radius: 7,            // The radius of the inner circle
      corners: 1,           // Corner roundness (0..1)
      rotate: 9,            // The rotation offset
      direction: 1,         // 1: clockwise, -1: counterclockwise
      color: '#000',        // #rgb or #rrggbb
      speed: 1,             // Rounds per second
      trail: 60,            // Afterglow percentage
      shadow: false,        // Whether to render a shadow
      hwaccel: true,        // Whether to use hardware acceleration
      className: 'spinner', // The CSS class to assign to the spinner
      top: 5,               // Top position relative to parent in px
      left: 'auto',         // Left position relative to parent in px
      zIndex: 2e9           // The z-index (defaults to 2000000000)
    });
  },

  onClose: function () {
    this.$el.spin(false);
  }
});

// Public API
exports.LoadingView = LoadingView;
