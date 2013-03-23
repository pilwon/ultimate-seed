/*
 * server/models/User.js
 */

'use strict';

var bcrypt = require('bcrypt'),
    mongoose = require('mongoose');

var plugin = mongoose.customPlugin,
    type = mongoose.customType;

var app = require('../app');

// Schema
var schema = new mongoose.Schema({
  email: { type: type.Email, required: true },
  name: {
    first: { type: String, required: true },
    last: { type: String, required: true }
  },
  accessToken: { type: String },
  auth: {
    local: {
      username: { type: type.Email },
      password: { type: String }
    },
    facebook: {
      id: { type: String },
      token: { type: String },
      profile: { type: type.Mixed }
    },
    google: {
      id: { type: String },
      token: { type: String },
      profile: { type: type.Mixed }
    },
    twitter: {
      id: { type: String },
      token: { type: String },
      profile: { type: type.Mixed }
    }
  },
  roles: [{ type: String }]
});

// Indexes
schema.path('email').index({ unique: true });
schema.path('auth.local.username').index({ index: true });
schema.path('auth.facebook.id').index({ index: true });
schema.path('auth.google.id').index({ index: true });
schema.path('auth.twitter.id').index({ index: true });

// Virtuals
schema.virtual('name.full').get(function () {
  return this.name.first + ' ' + this.name.last;
});
schema.virtual('name.full').set(function (name) {
  var split = name.split(' ');
  if (split.length >= 2) {
    this.name.last = split.splice(split.length - 1).join(' ');
  } else {
    this.name.last = '';
  }
  this.name.first = split.join(' ');
});

// Plugins
schema.plugin(plugin.findOrCreate);
schema.plugin(plugin.timestamps);

// Bcrypt middleware
schema.pre('save', function (next) {
  var SALT_WORK_FACTOR = 10,
      user = this;

  if (!user.isModified('auth.local.password')) {
    return next();
  }

  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) { return next(err); }

    bcrypt.hash(user.auth.local.password, salt, function (err, hash) {
      if (err) { return next(err); }
      user.auth.local.password = hash;
      next();
    });
  });
});

// Password verification
schema.methods.comparePassword = function (candidatePassword, cb) {
  var user = this;
  bcrypt.compare(candidatePassword, user.auth.local.password, function (err, isMatch) {
    if (err) { return cb(err); }
    cb(null, isMatch);
  });
};

// Remember Me implementation helper method
schema.methods.generateRandomToken = function () {
  var chars = '_!abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890',
      token = new Date().getTime() + '_';

  for (var x = 0; x < 16; ++x) {
    var i = Math.floor(Math.random() * 62);
    token += chars.charAt(i);
  }

  return token;
};

// Facebook auth
schema.statics.findOrCreateFacebook = function (accessToken, refreshToken, profile, cb) {
  // console.log(profile._json);
  app.models.User.findOneAndUpdate({
    email: profile._json.email || 'facebook:' + profile.id
  }, {
    name: {
      /* jshint camelcase: false */
      first: profile._json.first_name,
      last: profile._json.last_name
      /* jshint camelcase: true */
    },
    'auth.facebook': {
      id: profile.id,
      token: accessToken,
      profile: profile._json
    }
  }, { upsert: true }, cb);
};

// Google auth
schema.statics.findOrCreateGoogle = function (accessToken, refreshToken, profile, cb) {
  // console.log(profile._json);
  app.models.User.findOneAndUpdate({
    email: profile._json.email || 'google:' + profile.id
  }, {
    name: {
      /* jshint camelcase: false */
      first: profile._json.given_name,
      last: profile._json.family_name
      /* jshint camelcase: true */
    },
    'auth.google': {
      id: profile.id,
      token: accessToken,
      profile: profile._json
    }
  }, { upsert: true }, cb);
};

// Twitter auth
schema.statics.findOrCreateTwitter = function (token, tokenSecret, profile, cb) {
  // console.log(profile._json);
  app.models.User.findOneAndUpdate({ 'auth.twitter.uid': profile.id }, {
    email: 'twitter:' + profile.id,  // Twitter API doesn't provide e-mail.
    name: {
      first: profile._json.name.split(' ').slice(0, -1).join(' '),
      last: profile._json.name.split(' ').slice(-1).join(' ')
    },
    'auth.twitter': {
      id: profile.id,
      token: token,
      profile: profile._json
    }
  }, { upsert: true }, cb);
};

// Model
var model = mongoose.model('User', schema);

// Public API
exports = module.exports = model;
