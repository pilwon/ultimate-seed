/*
 * config/test/karma-e2e.conf.js
 *
 * Karma end-to-end testing configuration
 */

module.exports = function (config) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '../..',

    frameworks: ['mocha'],

    // list of files / patterns to load in the browser
    files: [
      ANGULAR_SCENARIO,
      ANGULAR_SCENARIO_ADAPTER,
      'client/components/angular/angular.js',
      'client/components/angular-cookies/angular-cookies.js',
      'client/components/angular-sanitize/angular-sanitize.js',
      'client/components/angular-mocks/angular-mocks.js',
      'client/js/**/*.js',
      'node_modules/chai/chai.js',
      'test/client/e2e/**/*.js'
    ],

    // list of files to exclude
    exclude: [],

    // use dots reporter, as travis terminal does not support escaping sequences
    // possible values: 'dots', 'progress'
    // CLI --reporters progress
    reporters: ['progress'],

    // web server port
    // CLI --port 9876
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    // CLI --colors --no-colors
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    // CLI --log-level debug
    logLevel: config.LOG_DEBUG,

    // enable / disable watching file and executing tests whenever any file changes
    // CLI --auto-watch --no-auto-watch
    autoWatch: true,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    // CLI --browsers Chrome,Firefox,Safari
    browsers: [process.env.TRAVIS ? 'Firefox' : 'Chrome'],

    // If browser does not capture in given timeout [ms], kill it
    // CLI --capture-timeout 5000
    captureTimeout: 60000,

    // Auto run tests on start (when browsers are captured) and exit
    // CLI --single-run --no-single-run
    singleRun: true,

    // report which specs are slower than 500ms
    // CLI --report-slower-than 500
    reportSlowerThan: 500,

    plugins: [
      'karma-mocha',
      'karma-chrome-launcher',
      'karma-firefox-launcher'
    ]
  });
};
