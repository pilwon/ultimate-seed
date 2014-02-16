/*
 * server/controllers/api/auth.js
 */

'use strict';

var _ = require('lodash'),
    S = require('string'),
    ultimate = require('ultimate');

var app = require('../../app');

function loginPOST(req, cb) {
  var errMsgs = [],
      focus = null;

  function _sendError(err) {
    if (!errMsgs.length) {
      errMsgs.push(err.message);
    }
    cb(err, {
      focus: focus,
      form: _.omit(req.body, 'password'),
      messages: errMsgs
    });
  }

  // Validation.
  if (_.isEmpty(req.body.username)) {
    errMsgs.push('<strong>Username</strong> is required.');
    focus = focus || 'username';
  } else if (/ /.test(req.body.username)) {
    errMsgs.push('<strong>Username</strong> cannot have a space.');
    focus = focus || 'username';
  } else if (!ultimate.util.regex.EMAIL.test(req.body.username)) {
    errMsgs.push('<strong>Username</strong> must be valid e-mail.');
    focus = focus || 'username';
  }

  if (_.isEmpty(req.body.password)) {
    errMsgs.push('<strong>Password</strong> is required.');
    focus = focus || 'password';
  } else if (/ /.test(req.body.password)) {
    errMsgs.push('<strong>Password</strong> cannot have a space.');
    focus = focus || 'password';
  } else if (req.body.password.length < 6 || req.body.password.length > 20) {
    errMsgs.push('<strong>Password</strong> must be 6 to 20 characters.');
    focus = focus || 'password';
  }

  // Return error.
  if (errMsgs.length) {
    return _sendError(new Error(S(errMsgs[0] || '').stripTags().s));
  }

  // Transform data.
  req.body.username = (req.body.username || '').toLowerCase();

  // Authentication.
  ultimate.lib.passport.authenticate('local', {
    badRequestMessage: 'Invalid input'
  }, function (err, user, info) {
    if (err) { return _sendError(err); }

    // Check values.
    if (!user) {
      if (info.messages) {
        errMsgs.push(info.messages);
      }
      if (_.isEmpty(req.body.username)) {
        errMsgs.push('Missing <strong>username</strong>.');
      }
      if (_.isEmpty(req.body.password)) {
        errMsgs.push('Missing <strong>password</strong>.');
      }
      return _sendError(new Error(S(errMsgs[0] || 'Username/password combination not found.').stripTags().s));
    }

    // Remember me.
    if (req.body.rememberMe) {
      req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 30;  // 1 month
    } else {
      req.session.cookie.expires = false;
    }

    // Log in.
    req.logIn(user, function (err) {
      if (err) { return _sendError(err); }
      return cb(null, user.getSafeJSON());
    });
  })(req, req.res, req.next);
}

function logoutPOST(req, cb) {
  // Log out.
  req.logout();
  return cb(null, {
    success: true
  });
}

function meLIST(req, cb) {
  return cb(null, req.user ? req.user.getSafeJSON() : null);
}

function registerPOST(req, cb) {
  var errMsgs = [],
      focus = null;

  function _sendError(err) {
    if (!errMsgs.length) {
      errMsgs.push(err.message);
    }
    cb(err, {
      focus: focus,
      form: _.omit(req.body, 'password', 'passwordRepeat'),
      messages: errMsgs
    });
  }

  // Validation.
  if (_.isEmpty(req.body.username)) {
    errMsgs.push('<strong>Username</strong> is required.');
    focus = focus || 'username';
  } else if (/ /.test(req.body.username)) {
    errMsgs.push('<strong>Username</strong> cannot have a space.');
    focus = focus || 'username';
  } else if (!ultimate.util.regex.EMAIL.test(req.body.username)) {
    errMsgs.push('<strong>Username</strong> must be valid e-mail.');
    focus = focus || 'username';
  }
  if (_.isEmpty(req.body.password)) {
    errMsgs.push('<strong>Password</strong> is required.');
    focus = focus || 'password';
  } else if (/ /.test(req.body.password)) {
    errMsgs.push('<strong>Password</strong> cannot have a space.');
    focus = focus || 'password';
  } else if (req.body.password.length < 6 || req.body.password.length > 20) {
    errMsgs.push('<strong>Password</strong> must be 6 to 20 characters.');
    focus = focus || 'password';
  }
  if (_.isEmpty(req.body.passwordRepeat)) {
    errMsgs.push('<strong>Password repeat</strong> is required.');
    focus = focus || 'passwordRepeat';
  } else if (req.body.password !== req.body.passwordRepeat) {
    errMsgs.push('<strong>Passwords</strong> do not match.');
    focus = focus || 'passwordRepeat';
  }
  if (_.isEmpty(req.body.firstName)) {
    errMsgs.push('<strong>First name</strong> is required.');
    focus = focus || 'firstName';
  }

  // Return error.
  if (errMsgs.length) {
    return _sendError(new Error(S(errMsgs[0] || '').stripTags().s));
  }

  // Transform data.
  req.body.username = S(req.body.username || '').trim().s.toLowerCase();
  req.body.firstName = S(req.body.firstName || '').trim().capitalize().s;
  req.body.lastName = S(req.body.lastName || '').trim().capitalize().s;

  // Registration.
  app.models.User.findOrCreateLocal(req.body, function (err, user) {
    if (err) { return _sendError(err); }
    req.logIn(user, function (err) {
      if (err) { return _sendError(err); }
      return cb(null, user.getSafeJSON());
    });
  });
}

// Public API
exports.login = { POST: loginPOST };
exports.logout = { POST: logoutPOST };
exports.me = { LIST: meLIST };
exports.register = { POST: registerPOST };
