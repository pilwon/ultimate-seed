/*
 * server/models/Feature.js
 */

'use strict';

var ultimate = require('ultimate');

var mongoose = ultimate.lib.mongoose,
    plugin = ultimate.db.mongoose.plugin;
    // type = ultimate.db.mongoose.type;

// var app = require('../app');

// Schema
var schema = new mongoose.Schema({
  text: { type: String, required: true },
  url: { type: String }
});

// Restify
schema.restify = {
  'list,get': '*',
  'post,put,delete': {
    'admin': '*'
  }
};

// Plugins
schema.plugin(plugin.findOrCreate);
schema.plugin(plugin.timestamp);

// Model
var model = mongoose.model('Feature', schema);

// Public API
exports = module.exports = model;

// Insert data.
var data = [
  {
    text: 'Angular',
    url: 'http://angularjs.org/'
  },
  {
    text: 'AngularUI',
    url: 'http://angular-ui.github.io/'
  },
  {
    text: 'Barbeque',
    url: 'https://github.com/pilwon/barbeque'
  },
  {
    text: 'Bootstrap',
    url: 'http://getbootstrap.com/'
  },
  {
    text: 'Bower',
    url: 'http://bower.io/'
  },
  {
    text: 'Browserify',
    url: 'https://github.com/substack/node-browserify'
  },
  {
    text: 'Express',
    url: 'http://expressjs.com/'
  },
  {
    text: 'Font Awesome',
    url: 'http://fortawesome.github.io/Font-Awesome/'
  },
  {
    text: 'Grunt',
    url: 'http://gruntjs.com/'
  },
  {
    text: 'Handlebars',
    url: 'http://handlebarsjs.com/'
  },
  {
    text: 'jQuery',
    url: 'http://jquery.com/'
  },
  {
    text: 'JSHint',
    url: 'http://www.jshint.com/'
  },
  {
    text: 'Karma w/ Mocha',
    url: 'http://karma-runner.github.io/'
  },
  {
    text: 'LESS',
    url: 'http://lesscss.org/'
  },
  {
    text: 'LESS Hat',
    url: 'http://lesshat.com/'
  },
  {
    text: 'Livereload',
    url: 'http://livereload.com/'
  },
  {
    text: 'Lodash (Underscore)',
    url: 'http://lodash.com/'
  },
  {
    text: 'Modernizr',
    url: 'http://modernizr.com/'
  },
  {
    text: 'MongoDB w/ Mongoose',
    url: 'http://www.mongodb.org/'
  },
  {
    text: 'Passport',
    url: 'http://passportjs.org/'
  },
  {
    text: 'Passport for Facebook',
    url: 'https://github.com/jaredhanson/passport-facebook'
  },
  {
    text: 'Passport for Google',
    url: 'https://github.com/jaredhanson/passport-google-oauth'
  },
  {
    text: 'Passport for Twitter',
    url: 'https://github.com/jaredhanson/passport-twitter'
  },
  {
    text: 'Redis w/ Hiredis',
    url: 'http://redis.io/'
  },
  {
    text: 'SocketIO',
    url: 'http://socket.io/'
  },
  {
    text: 'Source Maps',
    url: 'http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/'
  },
  {
    text: 'Uglify',
    url: 'http://lisperator.net/uglifyjs/'
  },
  {
    text: 'Winston',
    url: 'https://github.com/flatiron/winston'
  }
];
model.remove(function (err) {
  if (err) { throw err; }
  model.create(data, function (err) {
    if (err) { throw err; }
  });
});
