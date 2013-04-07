/*
 * config/karma.conf.js
 *
 * Karma configuration
 */

// base path, that will be used to resolve files and exclude
basePath = '..';

// list of files / patterns to load in the browser
files = [
  MOCHA,
  MOCHA_ADAPTER,
  REQUIRE,
  REQUIRE_ADAPTER,
  { pattern: 'client/components/chai/chai.js', included: false },
  'client/components/jquery/jquery.js',
  'client/components/jquery.cookie/jquery.cookie.js',
  'client/components/sass-bootstrap/docs/assets/js/bootstrap.js',
  'client/components/underscore-amd/underscore.js',
  'client/components/backbone-amd/backbone.js',
  'client/components/backbone.babysitter/lib/amd/backbone.babysitter.js',
  'client/components/backbone.eventbinder/lib/amd/backbone.eventbinder.js',
  'client/components/backbone.wreqr/lib/amd/backbone.wreqr.js',
  'client/components/backbone.marionette/lib/core/amd/backbone.marionette.js',
  'client/components/require-handlebars-plugin/Handlebars.js',
  'client/components/require-handlebars-plugin/hbs/i18nprecompile.js',
  'client/components/require-handlebars-plugin/hbs/json2.js',
  'client/components/require-handlebars-plugin/hbs.js',
  'client/components/backbone.marionette.handlebars/backbone.marionette.handlebars.js',
  'client/components/requirejs-i18n/i18n.js',
  'client/components/requirejs-text/text.js',
  'client/js/**/*.js',
  'test/client/**/*.js'
];

// list of files to exclude
exclude = [

];

// test results reporter to use
// possible values: 'dots', 'progress', 'junit'
reporters = ['progress'];

// web server port
port = 9876;

// cli runner port
runnerPort = 9100;

// enable / disable colors in the output (reporters and logs)
colors = true;

// level of logging
// possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
logLevel = LOG_DEBUG;

// enable / disable watching file and executing tests whenever any file changes
autoWatch = true;

// Start these browsers, currently available:
// - Chrome
// - ChromeCanary
// - Firefox
// - Opera
// - Safari (only Mac)
// - PhantomJS
// - IE (only Windows)
//browsers = ['Chrome', 'Firefox', 'Safari', 'PhantomJS'];
browsers = ['Chrome'];

// If browser does not capture in given timeout [ms], kill it
captureTimeout = 60000;

// Continuous Integration mode
// if true, it capture browsers, run tests and exit
singleRun = false;
