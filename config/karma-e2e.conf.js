/*
 * config/karma-e2e.conf.js
 *
 * Karma end-to-end testing configuration
 */

// base path, that will be used to resolve files and exclude
basePath = '..';

// list of files / patterns to load in the browser
files = [
  ANGULAR_SCENARIO,
  ANGULAR_SCENARIO_ADAPTER,
  'client/components/chai/chai.js',
  'client/components/angular/angular.js',
  'client/components/angular-cookies/angular-cookies.js',
  'client/components/angular-resource/angular-resource.js',
  'client/components/angular-sanitize/angular-sanitize.js',
  'client/js/**/*.js',
  'test/client/e2e/**/*.js'
];

// list of files to exclude
exclude = [
];

// test results reporter to use
// possible values: 'dots', 'progress', 'junit'
reporters = ['junit'];

// enable / disable colors in the output (reporters and logs)
colors = true;

// level of logging
// possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
logLevel = LOG_DEBUG;

// enable / disable watching file and executing tests whenever any file changes
autoWatch = false;

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

// Continuous Integration mode.
// If true, it capture browsers, run tests and exit. Since e2e testing is
// expensive, run only once.
singleRun = true;

proxies = {
  '/': 'http://localhost:3000/'
};

junitReporter = {
  outputFile: 'test_out/e2e.xml',
  suite: 'e2e'
};
