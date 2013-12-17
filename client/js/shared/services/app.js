/*
 * client/js/shared/services/app.js
 */

'use strict';

var _ = require('lodash');

var _injected;

var config = {};

function _initConfig() {
  var $cookieStore = _injected.$cookieStore,
      $rootScope = _injected.$rootScope;

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
    _injected = {
      $cookieStore: $cookieStore,
      $rootScope: $rootScope
    };

    _initConfig();

    return {
      config: config
    };
  });
};
