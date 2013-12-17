/*
 * client/js/shared/services/route.js
 */

'use strict';

var _ = require('lodash');

var _redirectActivated = false,
    _redirectRules = {},
    _injected;

function _buildStateUrl(state, $state) {
  var url = '';
  getAncestorStates(state, true).forEach(function (state) {
    url += $state.get(state).url || '';
  });
  return url;
}

/**
 * Given a state, e.g. "app.account.summary", returns an array of ancestor states
 * ["app", "app.account", "app.account.summary"] (last element removed if
 * `includeCurrentState` is false)
 */
function getAncestorStates(state, includeCurrentState) {
  var states = [state],
      temp;
  while (true) {
    if (states[0].indexOf('.') === -1) { break; }
    temp = states[0].split('.');
    states.unshift(temp.slice(0, temp.length - 1).join('.'));
  }
  if (!includeCurrentState) {
    states.pop();
  }
  return states;
}

function redirect(config) {
  _.assign(_redirectRules, config);
  if (!_redirectActivated) {
    _redirectActivated = true;
    _injected.$rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
      _.each(_redirectRules, function (rule, url) {
        if (toState.url.charAt(0) === '*' && toParams[toState.url.slice(1)] === url) {
          if (_.isPlainObject(rule)) {
            if (rule.state || rule.url) {
              event.preventDefault();
            }
            if (rule.state && rule.reload) {
              global.location.replace(_buildStateUrl(rule.state, _injected.$state));
            } else if (rule.state) {
              _injected.$state.go(rule.state);
            } else if (rule.url && rule.reload) {
              global.location.replace(rule.url);
            } else if (rule.url) {
              _injected.$location.path(rule.url);
            }
          } else if (_.isString(rule)) {
            event.preventDefault();
            _injected.$state.go(rule);
          }
        }
      });
    });
  }
}

// Public API
exports = module.exports = function (ngModule) {
  ngModule.factory('route', function ($location, $rootScope, $state) {
    _injected = {
      $location: $location,
      $rootScope: $rootScope,
      $state: $state
    };

    return {
      getAncestorStates: getAncestorStates,
      redirect: redirect
    };
  });
};
