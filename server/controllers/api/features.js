/*
 * server/controllers/api/features.js
 */

'use strict';

var _ = require('lodash');

// var app = require('../../app');

var _featuresDB = [
  {
    id: 1,
    text: 'Backbone',
    url: 'http://backbonejs.org/'
  },
  {
    id: 2,
    text: 'Backbone.Marionette',
    url: 'http://marionettejs.com/'
  },
  {
    id: 3,
    text: 'Bootstrap',
    url: 'http://getbootstrap.com/'
  },
  {
    id: 4,
    text: 'Bower',
    url: 'http://twitter.github.com/bower/'
  },
  {
    id: 5,
    text: 'Browserify',
    url: 'https://github.com/substack/node-browserify'
  },
  {
    id: 6,
    text: 'Express',
    url: 'http://expressjs.com/'
  },
  {
    id: 7,
    text: 'Font Awesome',
    url: 'http://fortawesome.github.io/Font-Awesome/'
  },
  {
    id: 8,
    text: 'Grunt',
    url: 'http://gruntjs.com/'
  },
  {
    id: 9,
    text: 'Handlebars',
    url: 'http://handlebarsjs.com/'
  },
  {
    id: 10,
    text: 'jQuery',
    url: 'http://jquery.com/'
  },
  {
    id: 11,
    text: 'JSHint',
    url: 'http://www.jshint.com/'
  },
  {
    id: 12,
    text: 'LESS',
    url: 'http://lesscss.org/'
  },
  {
    id: 13,
    text: 'LESS Hat',
    url: 'http://lesshat.com/'
  },
  {
    id: 14,
    text: 'Livereload',
    url: 'http://livereload.com/'
  },
  {
    id: 15,
    text: 'Lodash (Underscore)',
    url: 'http://lodash.com/'
  },
  {
    id: 16,
    text: 'Modernizr',
    url: 'http://modernizr.com/'
  },
  {
    id: 17,
    text: 'MongoDB w/ Mongoose',
    url: 'http://www.mongodb.org/'
  },
  {
    id: 18,
    text: 'Passport',
    url: 'http://passportjs.org/'
  },
  {
    id: 19,
    text: 'Passport for Facebook',
    url: 'https://github.com/jaredhanson/passport-facebook'
  },
  {
    id: 20,
    text: 'Passport for Google',
    url: 'https://github.com/jaredhanson/passport-google-oauth'
  },
  {
    id: 21,
    text: 'Passport for Twitter',
    url: 'https://github.com/jaredhanson/passport-twitter'
  },
  {
    id: 22,
    text: 'Redis w/ Hiredis',
    url: 'http://redis.io/'
  },
  {
    id: 23,
    text: 'SocketIO',
    url: 'http://socket.io/'
  },
  {
    id: 24,
    text: 'Source Maps',
    url: 'http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/'
  },
  {
    id: 25,
    text: 'Uglify',
    url: 'http://lisperator.net/uglifyjs/'
  },
  {
    id: 26,
    text: 'Winston',
    url: 'https://github.com/flatiron/winston'
  }
];

function LIST(req, cb) {
  cb(null, _featuresDB);
}

function GET(req, id, cb) {
  var item = null;
  if (_.isArray(_featuresDB) && _featuresDB.length) {
    if (_.isNumber(_featuresDB[0].id)) {
      item = _.find(_featuresDB, {'id': +id});
    } else {
      item = _.find(_featuresDB, {'id': id});
    }
  }
  if (item) {
    return cb(null, item);
  } else {
    return cb('invalid id - ' + id);
  }
}

function POST(req, cb) {
  cb('invalid method - ' + req.method);
}

function PUT(req, id, cb) {
  cb('invalid method - ' + req.method);
}

function DELETE(req, id, cb) {
  cb('invalid method - ' + req.method);
}

// Public API
exports.__filename = __filename;
exports.LIST = LIST;
exports.GET = GET;
exports.POST = POST;
exports.PUT = PUT;
exports.DELETE = DELETE;
