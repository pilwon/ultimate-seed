/*
 * client/js/tpl/_helpers/link.js
 */

/* global define */

define(['handlebars'], function (Handlebars) {
  'use strict';

  Handlebars.registerHelper('link', function (text, url) {
    return new Handlebars.SafeString(
      '<a href="' + url + '">' + text + '</a>'
    );
  });
});
