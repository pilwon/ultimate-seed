/*
 * server/controllers/home.js
 */

'use strict';

function express(req, res) {
  res.render('home/express', {
    hello: 'world'
  });
}

// Public API
exports.express = express;
