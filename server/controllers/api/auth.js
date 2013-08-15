/*
 * server/controllers/api/auth.js
 */

'use strict';

var _ = require('lodash'),
    S = require('string'),
    ultimate = require('ultimate');

var app = require('../../app'),
    passport = ultimate.lib.passport;

var EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

function loginPOST(req, cb) {
  var errorMsgs = [],
      params = req.body;

  // Defaults
  _.defaults(params, {
    username: '',
    password: ''
  });

  // Trim
  params.username = S(params.username).trim().s;

  // Validation
  if (_.isEmpty(params.username)) {
    errorMsgs.push('\'username\' is required.');
  }
  if (!EMAIL_REGEX.test(params.username)) {
    errorMsgs.push('\'username\' must be a valid e-mail address.');
  }
  if (_.isEmpty(params.password)) {
    errorMsgs.push('\'Password\' is required.');
  }
  if (/ /.test(params.password)) {
    errorMsgs.push('\'Password\' cannot have a space.');
  }
  if (params.password.length < 6 || params.password.length > 20) {
    errorMsgs.push('\'Password\' must be 6 to 20 characters.');
  }

  if (errorMsgs.length) {
    return cb(errorMsgs[0], {
      error: {
        messages: errorMsgs
      }
    });
  }

  // Authentication
  passport.authenticate('local', {
    badRequestMessage: 'Invalid input'
  }, function (err, user, info) {
    if (err) {
      return cb('Failed to log in.');
    }
    if (!user) {
      errorMsgs.push(info.messages);
      if (!req.body.username) {
        errorMsgs.push('Missing \'e-mail\'.');
      }
      if (!req.body.password) {
        errorMsgs.push('Missing \'password\'.');
      }
      return cb(errorMsgs[0], {
        error: {
          messages: errorMsgs
        }
      });
    }

    // Remember me
    if (req.body.rememberMe) {
      req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 30;  // 1 month
    } else {
      req.session.cookie.expires = false;
    }

    // Log in
    req.logIn(user, function (err) {
      if (err) {
        return cb('Failed to log in.');
      }
      app.lib.cookie.setUserCookie(req, req.res);
      return cb(null, {
        result: 'success'
      });
    });
  })(req, req.res, req.next);
}

function logoutPOST(req, cb) {
  req.logout();
  app.lib.cookie.clearUserCookie(req, req.res);
  cb(null, {
    result: 'success'
  });
}

function registerPOST(req, cb) {
  cb(new Error('Not yet implemented.'));
}

// Public API
exports.login = {
  __filename: __filename,
  POST: loginPOST
};
exports.logout = {
  __filename: __filename,
  POST: logoutPOST
};
exports.register = {
  __filename: __filename,
  POST: registerPOST
};
