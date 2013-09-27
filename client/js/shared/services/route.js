/*
 * client/js/shared/services/route.js
 */

'use strict';

var _ = require('lodash');

var _authorizeRules = {},
    _authorizeRolesActivated = false,
    _redirectRules = {},
    _redirectRulesActivated = false;

function _checkRoles(auth, rules) {
  var result = !_.has(rules, 'allow');
  _.compact(_.flatten([rules.allow])).forEach(function (role) {
    if (auth.isRole(role)) {
      result = true;
    }
  });
  _.compact(_.flatten([rules.deny])).forEach(function (role) {
    if (auth.isRole(role)) {
      result = false;
    }
  });
  return result;
}

// Given a state, e.g. "app.account.summary", returns an array of ancestor states
// ["app", "app.account", "app.account.summary"] (last element removed if
// `includeCurrentState` is false)
function _getAncestorStates(state, includeCurrentState) {
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

function authorize($rootScope, $state, auth, config) {
  // Update rules.
  var authorizeRules = {};
  _.sortBy(_.keys(config)).forEach(function (state) {
    authorizeRules[state] = config[state];
  });
  _.assign(_authorizeRules, authorizeRules);

  // Activate.
  if (!_authorizeRolesActivated) {
    $rootScope.$on('$stateChangeStart', function (event, toState) {
      _getAncestorStates(toState.name, true).reverse().forEach(function (state) {
        if (!event.defaultPrevented &&
            _.has(_authorizeRules, state) &&
            !_checkRoles(auth, _authorizeRules[state])) {
          event.preventDefault();
          $state.go(_authorizeRules[state].redirect || 'app.home');
        }
      });
    });
    _authorizeRolesActivated = true;
  }
}

function redirect($rootScope, $state, config) {
  // Update rules.
  _.assign(_redirectRules, config);

  // Activate.
  if (!_redirectRulesActivated) {
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
      _.each(_redirectRules, function (destState, url) {
        if (toState.url.charAt(0) === '*' && toParams[toState.url.slice(1)] === url) {
          event.preventDefault();
          $state.go(destState);
        }
      });
    });
    _redirectRulesActivated = true;
  }
}

// Public API
exports = module.exports = function (ngModule) {
  ngModule.factory('route', function () {
    return {
      authorize: authorize,
      redirect: redirect
    };
  });
};
