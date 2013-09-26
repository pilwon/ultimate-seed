/*
 * client/js/shared/services/route.js
 */

'use strict';

var _ = require('lodash');

function redirect($rootScope, $state, rules) {
  $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
    _.each(rules, function (destState, srcPath) {
      if (toState.url.charAt(0) === '*' && toParams[toState.url.slice(1)] === srcPath) {
        event.preventDefault();
        $state.go(destState);
      }
    });
  });
}

exports = module.exports = function (ngModule) {
  ngModule.factory('route', function () {
    return {
      redirect: redirect
    };
  });
};
