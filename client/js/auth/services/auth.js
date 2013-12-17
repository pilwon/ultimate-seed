/*
 * client/js/auth/services/auth.js
 */

'use strict';

var _ = require('lodash'),
    $ = require('jquery');

var _authorizeActivated = false,
    _authorizeRules = {},
    _user = {},
    _injected;

function _clearUser() {
  _.keys(_user).forEach(function (key) {
    delete _user[key];
  });
}

function _isRoleAllowedToAccess(rules) {
  if (!rules) { return true; }
  var result = !rules.allow.length;
  result = _.any(rules.allow, hasRole) ? true : result;
  result = _.any(rules.deny, hasRole) ? false : result;
  return result;
}

function _parseAuthorizeRules(authorizeRules, state) {
  if (!_.has(_authorizeRules, state)) { return null; }
  var rules = authorizeRules[state];
  rules.allow = _.compact(_.flatten([rules.allow]));
  rules.deny = _.compact(_.flatten([rules.deny]));
  if (!rules.redirect) {
    if (_.intersection(rules.allow, ['admin', 'user']).length &&
        !isAuthenticated()) {
      rules.redirect = 'app.login';
    }
    rules.redirect = rules.redirect || 'app.home';
  }
  return rules;
}

function _setUser(user) {
  if (_.isEmpty(user)) { return; }

  _clearUser();
  _.assign(_user, user);
  _.assign(_user, {
    is: hasRole,
    isAdmin: function () {
      return hasRole('admin');
    },
    isLoggedIn: isAuthenticated
  });

  if (hasRole('admin')) {
    $('html').addClass('admin-mode');
  } else {
    $('html').removeClass('admin-mode');
  }
}

function authorize(config) {
  _.assign(_authorizeRules, config);
  if (!_authorizeActivated) {
    _authorizeActivated = true;
    _injected.$rootScope.$on('$stateChangeStart', function (event, toState) {
      _injected.route.getAncestorStates(toState.name, true).reverse().forEach(function (state) {
        if (!event.defaultPrevented) {
          var rules = _parseAuthorizeRules(_authorizeRules, state);
          if (!_isRoleAllowedToAccess(rules)) {
            event.preventDefault();
            _injected.$state.go(rules.redirect);
          }
        }
      });
    });
  }
}

function getUser() {
  return _user;
}

function hasRole(role) {
  if (isAuthenticated() &&
      _.isArray(_user.roles) &&
      _.contains(_user.roles.concat('user'), role)) {
    return true;
  }
  return false;
}

function isAuthenticated() {
  return !_.isEmpty(_user);
}

function loadUserFromGlobal() {
  if (_.isPlainObject(global.config)) {
    _setUser(global.config.user);
  }
}

function login(formData) {
  return _injected.Restangular.all('login').post(formData).then(
    function (result) {
      _setUser(result);
      _injected.$state.go('app.account.summary');
    }
  );
}

function logout() {
  return _injected.Restangular.all('logout').post().then(
    function () {
      _clearUser();
      _injected.$state.go('app.home');
    }
  );
}

function register(formData) {
  return _injected.Restangular.all('register').post(formData);
}

// Public API
exports = module.exports = function (ngModule) {
  ngModule.provider('auth', {
    initUser: _setUser,

    $get: function ($rootScope, $state, Restangular, route) {
      _injected = {
        $rootScope: $rootScope,
        $state: $state,
        Restangular: Restangular,
        route: route
      };

      return {
        authorize: authorize,
        getUser: getUser,
        hasRole: hasRole,
        isAuthenticated: isAuthenticated,
        login: login,
        logout: logout,
        register: register
      };
    }
  });
};
