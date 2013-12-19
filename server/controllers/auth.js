/*
 * server/controllers/auth.js
 */

'use strict';

var querystring = require('querystring');

var ultimate = require('ultimate');

var passport = ultimate.lib.passport;

function facebook(req, res, next) {
  req.session.ultimate.query = req.query;
  passport.authenticate('facebook', {
    scope: [
      'email'
    ]
  })(req, res, next);
}

function facebookCallback(req, res, next) {
  var qs = querystring.stringify(req.session.ultimate.query);
  delete req.session.ultimate.query;
  passport.authenticate('facebook', {
    successRedirect: '/login' + (qs ? '?' + qs : ''),
    failureRedirect: '/login' + (qs ? '?' + qs : ''),
    failureFlash: true
  })(req, res, next);
}

function google(req, res, next) {
  req.session.ultimate.query = req.query;
  passport.authenticate('google', {
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email'
    ]
  })(req, res, next);
}

function googleCallback(req, res, next) {
  var qs = querystring.stringify(req.session.ultimate.query);
  delete req.session.ultimate.query;
  passport.authenticate('google', {
    successRedirect: '/login' + (qs ? '?' + qs : ''),
    failureRedirect: '/login' + (qs ? '?' + qs : ''),
    failureFlash: true
  })(req, res, next);
}

function twitter(req, res, next) {
  req.session.ultimate.query = req.query;
  passport.authenticate('twitter', {
    scope: [
      'email'
    ]
  })(req, res, next);
}

function twitterCallback(req, res, next) {
  var qs = querystring.stringify(req.session.ultimate.query);
  delete req.session.ultimate.query;
  passport.authenticate('twitter', {
    successRedirect: '/login' + (qs ? '?' + qs : ''),
    failureRedirect: '/login' + (qs ? '?' + qs : ''),
    failureFlash: true
  })(req, res, next);
}

// Public API
exports.facebook = facebook;
exports.facebookCallback = facebookCallback;
exports.google = google;
exports.googleCallback = googleCallback;
exports.twitter = twitter;
exports.twitterCallback = twitterCallback;
