/*
 * client/js/shared/services/route.js
 */

'use strict';

var _ = require('lodash');

var _redirectActivated = false,
    _redirectRules = {},
    _o;

function _buildStateUrl(state, $state) {
  var url = '';
  _o.util.getAncestorStates(state, true).forEach(function (state) {
    url += $state.get(state).url || '';
  });
  return url;
}

function redirect(config) {
  _.assign(_redirectRules, config);
  if (!_redirectActivated) {
    _redirectActivated = true;
    _o.$rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
      _.each(_redirectRules, function (rule, url) {
        if (toState.url.charAt(0) === '*' && toParams[toState.url.slice(1)] === url) {
          if (_.isPlainObject(rule)) {
            if (rule.state || rule.url) {
              event.preventDefault();
            }
            if (rule.state && rule.reload) {
              global.location.replace(_buildStateUrl(rule.state, _o.$state));
            } else if (rule.state) {
              _o.$state.go(rule.state);
            } else if (rule.url && rule.reload) {
              global.location.replace(rule.url);
            } else if (rule.url) {
              _o.$location.path(rule.url);
            }
          } else if (_.isString(rule)) {
            event.preventDefault();
            _o.$state.go(rule);
          }
        }
      });
    });
  }
}

// Public API
exports = module.exports = function (ngModule) {
  ngModule.factory('route', function ($location, $rootScope, $state, util) {
    _o = {
      $location: $location,
      $rootScope: $rootScope,
      $state: $state,
      util: util
    };

    return {
      redirect: redirect
    };
  });
};
