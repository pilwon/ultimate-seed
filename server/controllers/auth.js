/*
 * server/controllers/auth.js
 */

'use strict';

var util = require('util');

var S = require('string'),
    ultimate = require('ultimate');

var app = require('../app'),
    passport = ultimate.lib.passport;

function login(req, res) {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }
  res.render('auth/login', {
    focus: req.flash('errorParam').slice(0, 1)[0] || 'username',
    form: req.flash('form')[0],
    messages: req.flash('error').slice(0, 1)
  });
}

function loginPOST(req, res, next) {
  req.flash('form', req.body);

  // Validation
  var errors;
  req.body.username = S(req.body.username).trim().s;
  req.assert('username', '<strong>E-mail</strong> is required.').notEmpty();
  req.assert('username', '<strong>E-mail</strong> must be valid.').isEmail();
  req.assert('password', '<strong>Password</strong> is required.').notEmpty();
  req.assert('password', '<strong>Password</strong> cannot have a space.').notContains(' ');
  req.assert('password', '<strong>Password</strong> must be 6 to 20 characters.').len(6, 20);
  if ((errors = req.validationErrors()) && errors && errors.length > 0) {
    errors.forEach(function (error) {
      req.flash('errorParam', error.param);
      req.flash('error', '• ' + error.msg);
    });
    return res.redirect('/login');
  }

  // Authentication
  passport.authenticate('local', {
    badRequestMessage: 'Invalid input'
  }, function (err, user, info) {
    if (err) { return next(err); }
    if (!user) {
      req.flash('error', util.format('<strong>%s</strong>', info.message));
      if (!req.body.username) {
        req.flash('error', '• Missing <strong>e-mail</strong>.');
      }
      if (!req.body.password) {
        req.flash('error', '• Missing <strong>password</strong>.');
      }
      return res.redirect('/login');
    }

    // Remember me
    if (req.body.rememberMe) {
      req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 30;  // 1 month
    } else {
      req.session.cookie.expires = false;
    }

    // Log in
    req.logIn(user, function (err) {
      if (err) { return next(err); }
      req.flash('form');
      return res.redirect('/');
    });
  })(req, res, next);
}

function logout(req, res) {
  if (!req.isAuthenticated()) {
    return res.redirect('/');
  }
  res.redirect('/logout?_method=post');
}

function logoutPOST(req, res) {
  req.logout();
  app.lib.cookie.clearUserCookie(req, res);
  res.redirect('/');
}

function lostPassword(req, res) {
  res.render('auth/lost-password');
}

function lostPasswordPOST(req, res) {
  res.redirect('/');
}

function register(req, res) {
  res.render('auth/register', {
    focus: req.flash('errorParam').slice(0, 1)[0] || 'username',
    form: req.flash('form')[0],
    messages: req.flash('error').slice(0, 1)
  });
}

function registerPOST(req, res, next) {
  req.flash('form', req.body);

  // Validation
  var errors;
  req.body.username = S(req.body.username).trim().s;
  req.body.firstName = S(req.body.firstName).trim().capitalize().s;
  req.body.lastName = S(req.body.lastName).trim().capitalize().s;
  req.assert('username', '<strong>E-mail</strong> is required.').notEmpty();
  req.assert('username', '<strong>E-mail</strong> must be valid.').isEmail();
  req.assert('password', '<strong>Password</strong> is required.').notEmpty();
  req.assert('password', '<strong>Password</strong> cannot have a space.').notContains(' ');
  req.assert('password', '<strong>Password</strong> must be 6 to 20 characters.').len(6, 20);
  req.assert('passwordRepeat', '<strong>Password repeat</strong> is required.').notEmpty();
  req.assert('password', '<strong>Passwords</strong> must match.').equals(req.body.passwordRepeat);
  req.assert('firstName', '<strong>First name</strong> is required.').notEmpty();
  req.assert('lastName', '<strong>Last name</strong> is required.').notEmpty();
  if ((errors = req.validationErrors()) && errors && errors.length > 0) {
    errors.forEach(function (error) {
      req.flash('errorParam', error.param);
      req.flash('error', '• ' + error.msg);
    });
    return res.redirect('/register');
  }

  // Register
  app.models.User.findOne({
    'auth.local.username': req.body.username
  }, function (err, user) {
    if (err) { return next(err); }
    if (user) {
      req.flash('error', 'Username already exists.');
      return res.redirect('/register');
    }
    new app.models.User({
      'email': req.body.username,
      'name.first': req.body.firstName,
      'name.last': req.body.lastName,
      'auth.local.username': req.body.username,
      'auth.local.password': req.body.password
    }).save(function (err, user) {
      if (err) { return next(err); }
      req.logIn(user, function (err) {
        if (err) { return next(err); }
        req.flash('form');
        return res.redirect('/');
      });
    });
  });
}

function facebook(req, res, next) {
  passport.authenticate('facebook', {
    scope: [
      'email'
    ]
  })(req, res, next);
}

function facebookCallback(req, res, next) {
  passport.authenticate('facebook', {
    successRedirect: '/auth/facebook/success',
    failureRedirect: '/login',
    failureFlash: true
  })(req, res, next);
}

function facebookSuccess(req, res) {
  res.redirect('/');
}

function google(req, res, next) {
  passport.authenticate('google', {
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email'
    ]
  })(req, res, next);
}

function googleCallback(req, res, next) {
  passport.authenticate('google', {
    successRedirect: '/auth/google/success',
    failureRedirect: '/login',
    failureFlash: true
  })(req, res, next);
}

function googleSuccess(req, res) {
  res.redirect('/');
}

function twitter(req, res, next) {
  passport.authenticate('twitter', {
    scope: [
      'email'
    ]
  })(req, res, next);
}

function twitterCallback(req, res, next) {
  passport.authenticate('twitter', {
    successRedirect: '/auth/twitter/success',
    failureRedirect: '/login',
    failureFlash: true
  })(req, res, next);
}

function twitterSuccess(req, res) {
  res.redirect('/');
}

// Public API
exports.login = login;
exports.loginPOST = loginPOST;
exports.logout = logout;
exports.logoutPOST = logoutPOST;
exports.lostPassword = lostPassword;
exports.lostPasswordPOST = lostPasswordPOST;
exports.register = register;
exports.registerPOST = registerPOST;

exports.facebook = facebook;
exports.facebookCallback = facebookCallback;
exports.facebookSuccess = facebookSuccess;
exports.google = google;
exports.googleCallback = googleCallback;
exports.googleSuccess = googleSuccess;
exports.twitter = twitter;
exports.twitterCallback = twitterCallback;
exports.twitterSuccess = twitterSuccess;
