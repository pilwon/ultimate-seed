/*
 * client/js/handlebars/helpers/link.js
 */

'use strict';

var Handlebars = require('handlebars-runtime');

exports = module.exports = function (text, url) {
  return new Handlebars.SafeString(
    '<a href="' + url + '">' + text + '</a>'
  );
};
