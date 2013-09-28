/*
 * client/js/shared/services/route.js
 */

'use strict';

var _ = require('lodash');

var _authorizeActivated = false,
    _authorizeRules = {},
    _redirectActivated = false,
    _redirectRules = {};

function _buildStateUrl(state, $state) {
  var url = '';
  _getAncestorStates(state, true).forEach(function (state) {
    url += $state.get(state).url || '';
  });
  return url;
}

/**
 * Given a state, e.g. "app.account.summary", returns an array of ancestor states
 * ["app", "app.account", "app.account.summary"] (last element removed if
 * `includeCurrentState` is false)
 */
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

function _isRoleAllowedToAccess(auth, rules) {
  if (!rules) { return true; }
  var result = !rules.allow.length;
  result = _.any(rules.allow, auth.isRole) ? true : result;
  result = _.any(rules.deny, auth.isRole) ? false : result;
  return result;
}

function _parseAuthorizeRules(auth, authorizeRules, state) {
  if (!_.has(_authorizeRules, state)) { return null; }
  var rules = authorizeRules[state];
  rules.allow = _.compact(_.flatten([rules.allow]));
  rules.deny = _.compact(_.flatten([rules.deny]));
  if (!rules.redirect) {
    if (_.intersection(rules.allow, ['admin', 'user']).length &&
        !auth.isAuthenticated()) {
      rules.redirect = 'app.login';
    }
    rules.redirect = rules.redirect || 'app.home';
  }
  return rules;
}

function authorize($rootScope, $state, auth, config) {
  _.assign(_authorizeRules, config);
  if (!_authorizeActivated) {
    _authorizeActivated = true;
    $rootScope.$on('$stateChangeStart', function (event, toState) {
      _getAncestorStates(toState.name, true).reverse().forEach(function (state) {
        if (!event.defaultPrevented) {
          var rules = _parseAuthorizeRules(auth, _authorizeRules, state);
          if (!_isRoleAllowedToAccess(auth, rules)) {
            event.preventDefault();
            $state.go(rules.redirect);
          }
        }
      });
    });
  }
}

function redirect($location, $rootScope, $state, config) {
  _.assign(_redirectRules, config);
  if (!_redirectActivated) {
    _redirectActivated = true;
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
      _.each(_redirectRules, function (rule, url) {
        if (toState.url.charAt(0) === '*' && toParams[toState.url.slice(1)] === url) {
          if (_.isPlainObject(rule)) {
            if (rule.state || rule.url) {
              event.preventDefault();
            }
            if (rule.state && rule.reload) {
              global.location.replace(_buildStateUrl(rule.state, $state));
            } else if (rule.state) {
              $state.go(rule.state);
            } else if (rule.url && rule.reload) {
              global.location.replace(rule.url);
            } else if (rule.url) {
              $location.path(rule.url);
            }
          } else if (_.isString(rule)) {
            event.preventDefault();
            $state.go(rule);
          }
        }
      });
    });
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
