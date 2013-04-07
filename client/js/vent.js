/*
 * client/js/vent.js
 */

/* global define */

define(['backbone.wreqr'], function (Wreqr) {
  'use strict';

  return new Wreqr.EventAggregator();
});
