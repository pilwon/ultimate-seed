/*
 * server/controllers/auth.js
 */

'use strict';

var querystring = require('querystring');

var ultimate = require('ultimate');

var passport = ultimate.lib.passport;

function *facebook(next) {
  this.session.ultimate.query = this.query;
  passport.authenticate('facebook', {
    scope: [
      'email'
    ]
  }).call(this, next);
}

function *facebookCallback(next) {
  var qs = querystring.stringify(this.session.ultimate.query);
  delete this.session.ultimate.query;
  passport.authenticate('facebook', {
    successRedirect: '/login' + (qs ? '?' + qs : ''),
    failureRedirect: '/login' + (qs ? '?' + qs : ''),
    failureFlash: true
  }).call(this, next);
}

function *google(next) {
  this.session.ultimate.query = this.query;
  passport.authenticate('google', {
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email'
    ]
  }).call(this, next);
}

function *googleCallback(next) {
  var qs = querystring.stringify(this.session.ultimate.query);
  delete this.session.ultimate.query;
  passport.authenticate('google', {
    successRedirect: '/login' + (qs ? '?' + qs : ''),
    failureRedirect: '/login' + (qs ? '?' + qs : ''),
    failureFlash: true
  })(next);
}

function *twitter(next) {
  this.session.ultimate.query = this.query;
  passport.authenticate('twitter', {
    scope: [
      'email'
    ]
  }).call(this, next);
}

function *twitterCallback(next) {
  var qs = querystring.stringify(this.session.ultimate.query);
  delete this.session.ultimate.query;
  passport.authenticate('twitter', {
    successRedirect: '/login' + (qs ? '?' + qs : ''),
    failureRedirect: '/login' + (qs ? '?' + qs : ''),
    failureFlash: true
  }).call(this, next);
}

// Public API
exports.facebook = facebook;
exports.facebookCallback = facebookCallback;
exports.google = google;
exports.googleCallback = googleCallback;
exports.twitter = twitter;
exports.twitterCallback = twitterCallback;
