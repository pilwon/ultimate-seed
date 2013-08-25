/*
 * test/intern.js
 *
 * https://github.com/theintern/intern/wiki/Configuring-Intern
 */

define({

  proxyPort: 9000,
  proxyUrl: 'http://localhost:9000/',

  capabilities: {
    'selenium-version': '2.30.0'
  },

  environments: [
    { browserName: 'internet explorer', version: '10', platform: 'Windows 8' },
    { browserName: 'internet explorer', version: '9', platform: 'Windows 7' },
    { browserName: 'firefox', version: '23', platform: [ 'Linux', 'Windows 7' ] },
    { browserName: 'firefox', version: '21', platform: 'Mac 10.6' },
    { browserName: 'chrome', platform: [ 'Linux', 'Mac 10.8', 'Windows 7' ] },
    { browserName: 'safari', version: '6', platform: 'Mac 10.8' }
  ],

  maxConcurrency: 3,
  useSauceConnect: false,

  webdriver: {
    host: 'localhost',
    port: 4444
  },

  loader: {
    packages: []
  },

  suites: [
    'test/client/test',
    'test/server/test'
  ],

  functionalSuites: [
    // 'test/client/functional',
    // 'test/server/functional'
  ],

  excludeInstrumentation: /^/
});
