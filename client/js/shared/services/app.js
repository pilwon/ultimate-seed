/*
 * client/js/shared/services/app.js
 */

'use strict';

var _ = require('lodash');

var _o;

var config = {};

function _initConfig() {
  var $cookieStore = _o.$cookieStore,
      $rootScope = _o.$rootScope;

  // Load global config.
  if (_.isPlainObject(global.config)) {
    config = global.config;
  }

  // Set cookie defaults
  if (_.isUndefined($cookieStore.get('test'))) {
    $cookieStore.put('test', 'ultimate-seed');
  }

  // Config defaults.
  config = _.defaults(config, {
    test: $cookieStore.get('test'),
    title: 'ultimate-seed'
  });

  // Convert config to scope.
  config = _.defaults($rootScope.$new(), config);

  // Update cookies on config change.
  config.$watch('test', function () {
    $cookieStore.put('test', config.xxx);
  });
}

// Public API
exports = module.exports = function (ngModule) {
  ngModule.factory('app', function ($cookieStore, $rootScope) {
    _o = {
      $cookieStore: $cookieStore,
      $rootScope: $rootScope
    };

    _initConfig();

    return {
      config: config
    };
  });
};
