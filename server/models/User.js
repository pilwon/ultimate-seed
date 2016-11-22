/*
 * server/models/User.js
 */

'use strict';

var _ = require('lodash'),
    bcrypt = require('bcrypt'),
    ultimate = require('ultimate');

var mongoose = ultimate.lib.mongoose,
    plugin = ultimate.db.mongoose.plugin,
    type = ultimate.db.mongoose.type;

var app = require('../app');

// Schema
var schema = new mongoose.Schema({
  email: { type: type.Email, required: true },
  name: {
    first: { type: String, required: true },
    last: { type: String }
  },
  accessToken: { type: String },
  auth: {
    local: {
      username: { type: type.Email },
      password: { type: String }
    }
  },
  roles: [{ type: String }]
});

// Restify
schema.restify = {
  'list': {
    'admin': '*',
    'user': ['name.first']
  },
  'get': {
    'admin': '*',
    'user': ['name.first']
  },
  'post': {
    'admin': '*'
  },
  'put': {
    'admin': '*'
  },
  'delete': {
    'admin': '*'
  }
};

// Indexes
schema.path('email').index({ unique: true });
schema.path('accessToken').index({ unique: true });
schema.path('auth.local.username').index({ unique: true, sparse: true });

// Virtuals
schema.virtual('safeJSON').get(function () {
  return JSON.stringify(this.getSafeJSON());
});
schema.virtual('name.full').get(function () {
  return this.name.first + ' ' + this.name.last;
});
schema.virtual('name.full').set(function (name) {
  this.name.first = name.slice(0, Math.max(1, name.length - 1)).join(' ');
  this.name.last = name.slice(Math.max(1, name.length - 1)).join(' ');
});

// Plugins
schema.plugin(plugin.findOrCreate);
schema.plugin(plugin.timestamp);

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

// Promote user to admin if admin does not yet exist.
schema.pre('save', function (next) {
  var user = this,
      model = exports;
  model.count({ roles: 'admin' }, function (err, count) {
    if (err) { return next(err); }
    if (count === 0) {
      user.roles.push('admin');
    }
    next();
  });
});

// Password verification
schema.methods.comparePassword = function (candidatePassword, cb) {
  var user = this;
  bcrypt.compare(candidatePassword, user.auth.local.password, cb);
};

// Safe JSON (internal data removed)
schema.methods.getSafeJSON = function () {
  var user = this.toJSON();

  user.id = user._id;
  delete user._id;
  delete user.__v;
  delete user.accessToken;

  if (user.auth.local) {
    delete user.auth.local.password;
  }

  return user;
};

/**
 * Local auth
 */
schema.statics.findOrCreateLocal = function (profile, cb) {
  var data = {
    email: profile.username,
    name: {
      first: profile.firstName,
      last: profile.lastName
    },
    'auth.local': {
      username: profile.username,
      password: profile.password
    }
  };
  app.models.User.findOne({
    email: data.email
  }, function (err, user) {
    if (err) { return cb(err); }
    if (user) {
      if (_.isEmpty(user.get('auth.local'))) {
        user.auth.local.username = profile.username;
        user.auth.local.password = profile.password;
        user.save(cb);
      } else {
        user.comparePassword(profile.password, function (err, matched) {
          if (err) { return cb(err); }
          if (matched) {
            // Update existing account.
            user.name = data.name;
            user.save(cb);
          } else {
            // Account created by someone else or using non-local.
            return cb(new Error('Account already exists.'));
          }
        });
      }
    } else {
      // Create new account.
      app.models.User.create(data, cb);
    }
  });
};

// Model
var model = mongoose.model('User', schema);

// Public API
exports = module.exports = model;
