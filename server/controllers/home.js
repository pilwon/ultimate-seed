/*
 * server/controllers/home.js
 */

'use strict';

function express(req, res) {
  res.render('home/express', {
    hello: 'Hello from express world!'
  });
}

// Public API
exports.express = express;
