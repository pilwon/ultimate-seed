/*
 * server/controllers/home.js
 */

'use strict';

function index(req, res) {
  res.render('home/index');
}

function express(req, res) {
  res.render('home/express', {
    hello: 'Hello from express world!'
  });
}

function page(req, res) {
  res.render('home/page', {
    layout: 'static',
    documentTitle: 'Static Page',
    navTitle: 'Static Layout'
  });
}

// Public API
exports.index = index;
exports.express = express;
exports.page = page;
