/*
 * server/controllers/auth.js
 */

'use strict';

var ultimate = require('ultimate');

var //app = require('../app'),
    passport = ultimate.lib.passport;

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
  res.redirect('/account');
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
  res.redirect('/account');
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
  res.redirect('/account');
}

// Public API
exports.facebook = facebook;
exports.facebookCallback = facebookCallback;
exports.facebookSuccess = facebookSuccess;
exports.google = google;
exports.googleCallback = googleCallback;
exports.googleSuccess = googleSuccess;
exports.twitter = twitter;
exports.twitterCallback = twitterCallback;
exports.twitterSuccess = twitterSuccess;
