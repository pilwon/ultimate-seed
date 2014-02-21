/*
 * client/js/auth/services/auth.js
 */

'use strict';

var querystring = require('querystring');

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

  $('html').removeClass('admin-mode');
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

function _parseStateData(stateParams) {
  var result = null;
  if (stateParams.s &&
      _o.$state.get(stateParams.s) &&
      !_o.$state.get(stateParams.s).abstract) {
    result = {
      state: stateParams.s
    };
    if (!_.isEmpty(stateParams.sp)) {
      result.stateParams = JSON.parse(stateParams.sp);
    }
  }
  return result;
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
          var rules = _parseAuthorizeRules(_authorizeRules, state),
              data;

          if (!_isRoleAllowedToAccess(rules)) {
            event.preventDefault();

            if (_.contains(['app.login', 'app.register'], toState.name)) {
              data = _parseStateData(toParams);
              if (!_.isEmpty(data) &&
                  _o.$state.get(data.state) &&
                  !_o.$state.get(data.state).abstract &&
                  _isRoleAllowedToAccess(_parseAuthorizeRules(_authorizeRules, data.state))) {
                return _o.$state.go(data.state, data.stateParams);
              }
            }

            if (_.isEmpty(rules.redirectParams)) {
              rules.redirectParams = {
                s: toState.name
              };

              if (!_.isEmpty(toParams)) {
                rules.redirectParams.sp = JSON.stringify(toParams);
              }
            }

            _o.$state.go(rules.redirect, rules.redirectParams);
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

      var data = _parseStateData(_o.$stateParams);
      if (!_.isEmpty(data)) {
        _o.$state.go(data.state, data.stateParams);
      } else if (!!redirect) {
        _o.$state.go('app.account.summary');
      }
    }
  );
}

function loginFacebook() {
  var qs = querystring.stringify(_o.$stateParams);
  global.location.href = '/auth/facebook' + (qs ? '?' + qs : '');
}

function loginGoogle() {
  var qs = querystring.stringify(_o.$stateParams);
  global.location.href = '/auth/google' + (qs ? '?' + qs : '');
}

function loginTwitter() {
  var qs = querystring.stringify(_o.$stateParams);
  global.location.href = '/auth/twitter' + (qs ? '?' + qs : '');
}

function logout() {
  return _o.Restangular.all('logout').post().then(
    function () {
      _clearUser();

      var data = _parseStateData(_o.$stateParams);
      if (!_.isEmpty(data)) {
        _o.$state.go(data.state, data.stateParams);
      } else {
        global.location.reload();
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
  ngModule.provider('auth', function () {
    this.initUser = _setUser;

    this.$get = ['$rootScope', '$state', '$stateParams', 'Restangular', 'util', function ($rootScope, $state, $stateParams, Restangular, util) {
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
        loginFacebook: loginFacebook,
        loginGoogle: loginGoogle,
        loginTwitter: loginTwitter,
        logout: logout,
        register: register
      };
    }];
  });
};
