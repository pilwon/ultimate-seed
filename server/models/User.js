/*
 * server/models/User.js
 */

'use strict';

var util = require('util');

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
schema.path('auth.facebook.id').index({ unique: true, sparse: true });
schema.path('auth.google.id').index({ unique: true, sparse: true });
schema.path('auth.twitter.id').index({ unique: true, sparse: true });

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
  if (user.auth.facebook) {
    delete user.auth.facebook.token;
  }
  if (user.auth.google) {
    delete user.auth.google.token;
  }
  if (user.auth.twitter) {
    delete user.auth.twitter.token;
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

/**
 * Facebook auth
 */
schema.statics.findOrCreateFacebook = function (accessToken, refreshToken, profile, cb) {
  // console.log(profile._json);
  var data = {
    email: profile._json.email,
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
  };
  app.models.User.findOneAndUpdate({
    email: data.email
  }, _.omit(data, ['email', 'name']), function (err, user) {
    if (err) { return cb(err); }
    if (user) {
      // Updated existing account.
      return cb(null, user);
    } else {
      // Create new account.
      app.models.User.create(data, cb);
    }
  });
};

/**
 * Google auth
 */
schema.statics.findOrCreateGoogle = function (accessToken, refreshToken, profile, cb) {
  // console.log(profile._json);
  var data = {
    email: profile._json.email,
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
  };
  app.models.User.findOneAndUpdate({
    email: data.email
  }, _.omit(data, ['email', 'name']), function (err, user) {
    if (err) { return cb(err); }
    if (user) {
      // Updated existing account.
      return cb(null, user);
    } else {
      // Create new account.
      app.models.User.create(data, cb);
    }
  });
};

/**
 * Twitter auth
 *
 * Twitter API doesn't provide e-mail, therefore
 * a fake e-mail address is generated in order to
 * pass field requirement validation.
 * E-mail may be updated by other auth strategies.
 */
schema.statics.findOrCreateTwitter = function (token, tokenSecret, profile, cb) {
  // console.log(profile._json);
  var data = {
    email: util.format('%s@%s.twitter.id',
                       ultimate.util.uuid({ dash: false }),
                       profile.id),
    name: {
      first: profile._json.name.split(' ').slice(0, -1).join(' '),
      last: profile._json.name.split(' ').slice(-1).join(' ')
    },
    'auth.twitter': {
      id: profile.id,
      token: token,
      profile: profile._json
    }
  };
  app.models.User.findOneAndUpdate({
    'auth.twitter.id': profile.id
  }, _.omit(data, ['email', 'name']), function (err, user) {
    if (err) { return cb(err); }
    if (user) {
      // Updated existing account.
      return cb(null, user);
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
