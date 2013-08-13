/*
 * client/js/lib/google-analytics/index.js
 *
 * https://github.com/kendagriff/backbone.analytics
 */

'use strict';

global._gaq = global._gaq || [];

global._gaq.push(['_setAccount', '@@@@@']);

// Comment out to prevent double counting the initial page load.
// global._gaq.push(['_trackPageview']);

// Create script tag.
var script = document.createElement('script');
script.async = true;
script.type = 'text/javascript';
script.src = ('https:' === document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';

// Insert script tag.
var s = document.getElementsByTagName('script')[0];
s.parentNode.insertBefore(script, s);
