/*
 * config/test/protractor-e2e.conf.js
 *
 * Protractor end-to-end testing configuration
 */

exports.config = {
  // The address of a running selenium server.
  seleniumAddress: 'http://localhost:4444/wd/hub',

  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'chrome'
  },

  // Spec patterns are relative to the location of the spec file. They may
  // include glob patterns.
  specs: [
    // TODO: Fix path being relative to config/test/
    '../../test/client/e2e/**/*.js'
  ],

  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000
  }
}
