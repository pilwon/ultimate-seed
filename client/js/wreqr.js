/*
 * client/js/wreqr.js
 */

/* global define */

define([
  'backbone.wreqr'
], function (Wreqr) {
  'use strict';

  var commands = new Wreqr.Commands(),
      reqres = new Wreqr.RequestResponse(),
      vent = new Wreqr.EventAggregator();

  //...

  return {
    commands: commands,
    reqres: reqres,
    vent: vent
  };
});
