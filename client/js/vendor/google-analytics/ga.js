/*
 * client/js/vendor/google-analytics/ga.js
 */

/* global define */

require([

], function () {
  'use strict';

  function _init() {
    window._gaq = window._gaq || [];
    window._gaq.push(['_setAccount', 'UA-XXXXXX-X']);
    window._gaq.push(['_trackPageview']);

    // Create script tag.
    var script = document.createElement('script');
    script.async = true;
    script.type = 'text/javascript';
    script.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';

    // Insert script tag.
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(script, s);
  }

  _init();
});
