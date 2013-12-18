/*
 * client/js/auth/services/auth.js
 */

'use strict';

var _ = require('lodash'),
    $ = require('jquery');

var _authorizeActivated = false,
    _authorizeRules = {},
    _user = {},
    _o;

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
    _o.$rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
      _o.util.getAncestorStates(toState.name, true).reverse().forEach(function (state) {
        if (!event.defaultPrevented) {
          var params = {},
              rules = _parseAuthorizeRules(_authorizeRules, state);
          if (!_isRoleAllowedToAccess(rules)) {
            event.preventDefault();
            params.s = toState.name;
            if (!_.isEmpty(toParams)) {
              params.sp = JSON.stringify(toParams);
            }
            _o.$state.go(rules.redirect, params);
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

function login(formData, redirect) {
  return _o.Restangular.all('login').post(formData).then(
    function (result) {
      _setUser(result);
      if (_o.$stateParams.u) {
        global.location.href = _o.$stateParams.u;
      } else if (_o.$stateParams.s &&
                 _o.$state.get(_o.$stateParams.s) &&
                 !_o.$state.get(_o.$stateParams.s).abstract) {
        _o.$state.go(_o.$stateParams.s, JSON.parse(_o.$stateParams.sp));
      } else if (!!redirect) {
        _o.$state.go('app.account.summary');
      }
    }
  );
}

function logout() {
  return _o.Restangular.all('logout').post().then(
    function () {
      _clearUser();
      if (_o.$stateParams.u) {
        global.location.href = _o.$stateParams.u;
      } else if (_o.$stateParams.s &&
                 _o.$state.get(_o.$stateParams.s) &&
                 !_o.$state.get(_o.$stateParams.s).abstract) {
        _o.$state.go(_o.$stateParams.s, JSON.parse(_o.$stateParams.sp));
      } else {
        _o.$state.go('app.home');
      }
    }
  );
}

function register(formData) {
  return _o.Restangular.all('register').post(formData).then(
    function () {
      return login(formData, true);
    }
  );
}

// Public API
exports = module.exports = function (ngModule) {
  ngModule.provider('auth', {
    initUser: _setUser,

    $get: function ($rootScope, $state, $stateParams, Restangular, util) {
      _o = {
        $rootScope: $rootScope,
        $state: $state,
        $stateParams: $stateParams,
        Restangular: Restangular,
        util: util
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
