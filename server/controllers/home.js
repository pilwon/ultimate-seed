/*
 * server/controllers/home.js
 */

'use strict';

function hello(req, res) {
  res.render('hello', {
    hello: 'world'
  });
}

// Public API
exports.hello = hello;
